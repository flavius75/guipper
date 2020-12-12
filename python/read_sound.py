# -*- coding: utf-8 -*-
"""
Created on Tue Sep 29 14:09:31 2020

@author: vicgu
"""

import pandas as pd 
import numpy as np 
import os 
import pydub
import wave
import seaborn as sns
import re
import matplotlib.pyplot as plt
from guipper import dataset_chords
import itertools 

def read_sound(path) : 
    """
    Récupère tout les fichiers audio de "path" et les convertis en dataframe 

    Parameters
    ----------
    path : String
        Chemin d'accès pour lire les fichiers audio .wav

    Returns
    -------
    dic : Dictionnaire
        Dictionnaire de dataframe comportant les données audios 
        pour chaque fichier audio dans le chemin
    frequency : Int
        Fréquence d'échantillonnage 
    """
    file_names  = os.listdir(path)
    file_names = [n for n in file_names if re.search(r'wav', n)]
    dic = {}
    df = pd.DataFrame()
    for i in file_names : 
        wave_form = wave.open(path + i, "r")
        frequency = wave_form.getframerate()
        decomposite = pydub.AudioSegment.from_wav(path + i)
        decomposite = decomposite.low_pass_filter(80)
        decomposite = decomposite.high_pass_filter(1500)
        array = np.array(decomposite.get_array_of_samples())
        df = pd.DataFrame()
        df["value"] = array 
        df["temps"] = df.index/frequency
        dic[i] = df 
        
    return dic, frequency


def fft(dic, frequency) : 
    """
    Réalise la FFT pour chaque échantillons de son de guitare
    
    Parameters
    ----------
    dic : Dictionnaire
        Dictionnaire de Dataframe comportant les données audio de chaque
        échantillons 
    frequency : Int
        Fréquence d' échantillonnage

    Returns
    -------
    dic_fft : Dictionnaire
        Dictionnaire de dataframe comportant la FFT pour chaque échantillons

    """
    samplingFrq = frequency
    samplingInterval = 1/samplingFrq
    dic_fft = {}
    
    for i in dic : 
        df_fft = pd.DataFrame()
        begin = min(dic[i]["temps"])
        end = max(dic[i]["temps"])
        time = np.arange(begin, end, samplingInterval)
        amplitude = dic[i]["value"]
        fourierTransform = np.fft.fft(amplitude)/len(amplitude) 
        fourierTransform = fourierTransform[range(int(len(amplitude)/2))]
        tpCount = len(amplitude)
        values = np.arange(int(tpCount/2))
        timePeriod = tpCount/samplingFrq
        frequencies = values/timePeriod
        df_fft["frequencies"] = np.round(frequencies)
        df_fft["FFT"] = abs(fourierTransform)
        df_fft["FFT"] = 20 * np.log10(df_fft["FFT"])
        df_fft = df_fft.groupby("frequencies", as_index= False).max()
        dic_fft[i] = df_fft
        
        #sns.set_style("white") 
        #plt.title("FFT en fonction de la fréquence")
        #plt.grid()
        #plt.xscale("log")
        #plt.xlabel("frequency")
        #plt.ylabel("Amplitude")
        #plt.plot( df_fft["frequencies"], df_fft["FFT"])
        #plt.xlim(50,1500)
      
    return dic_fft 

def list_frq(note) : 
    """
    Récupère les compositions de fréquence avec une marge de 2% pour l'accord 
    entrée en paramètre basé sur la fonction dataset
    
    Parameters
    ----------
    note : String
        Accord écrit selon la casse de la fonction dataset

    Returns
    -------
    
    frq_fonda : List
        Liste des fréquences fondamentales possibles pour l'accord en entrée
    frq_tierce : List
        Liste des fréquences tierce possibles pour l'accord en entrée
    frq_quinte : List
        Liste des fréquences quintes possibles pour l'accord en entrée

    """
    
    accord = dataset_chords() 
    frq_fonda = [j for k, j in zip(accord["Accord"], accord["Frq_Fondamental"]) if re.search(note, k)]
    frq_fonda = list(set(frq_fonda))
    frq_fonda = [list(range(int(round(k - k * 0.02)), int(round(k + k * 0.02)))) for k in frq_fonda]
    frq_fonda = list(itertools.chain(*frq_fonda))
    frq_tierce = [j for k, j in zip(accord["Accord"], accord["Frq_Tierce"]) if re.search(note, k)]
    frq_tierce = list(set(frq_tierce))
    frq_tierce = [list(range(int(round(k - k * 0.02)), int(round(k + k * 0.02)))) for k in frq_tierce]
    frq_tierce = list(itertools.chain(*frq_tierce))
    frq_quinte = [j for k, j in zip(accord["Accord"], accord["Frq_Quinte"]) if re.search(note, k)]
    frq_quinte = list(set(frq_quinte))
    frq_quinte = [list(range(int(round(k - k * 0.02)), int(round(k + k * 0.02)))) for k in frq_quinte]
    frq_quinte = list(itertools.chain(*frq_quinte))
    
    return frq_fonda, frq_tierce, frq_quinte
    
    
def get_marker(df_fft) : 
    """
    Créer un marker qui permet de savoir les périodes ou le signal est croissant

    Parameters
    ----------
    df_fft : DataFrame
        FFT d'un signal audio

    Returns
    -------
    df : DataFrame
        FFT d'un signal audio avec le marker de croissance

    """
    df = df_fft 
    df = round(df)
    df["shift_Frq"] = df.frequencies.shift(1)
    df["shift_FFT"] = df.FFT.shift(1)
    df = df.fillna(0)
    df["compar"] = np.greater(df["FFT"], df["shift_FFT"])
    df["compar_2"] = df.compar.shift(1)
    df = df.fillna(df.compar.head(1)[0])
    k = 0 
    marker = []
    for i, j in zip(df.compar, df.compar_2) : 
        if i != j : 
            k = k + 1 
            marker.append(k)
        else : 
            marker.append(k)
    df["marker"] = marker
    df = df.drop(["compar_2", "shift_FFT","shift_Frq"], axis = 1)
    
    return df 

def recup_for_predict(dic_fft, offset, pivot, lenght) : 
    """
    Récupère les 3 fréquences qui possèdent les plus hautes FFT pour 
    chaque partie du signal décomposé 
    
    Parameters
    ----------
    dic_fft : Dictionnaire
        Dictionnaire de FFT composé de chaque partie du signal
    offset : float
        offset pour récuperer les fft 
    pivot : boolean
        Si pivot = True, met dans un format pivoté
    Returns
    -------
    result : DataFrame
        DataFrame avec les 3 fréquences pour chaque parties 

    """
    result = pd.DataFrame()
    for i in dic_fft : 
        part = dic_fft[i]
        part = get_marker(part)
        part = part.loc[part.compar == True]
        part = part.loc[part.FFT > 1]
        if not(part.empty) : 
            max_values = get_max(part, "marker")
            out = detect_same(max_values, offset, pivot, lenght)
            out["part"] = i
            out = out.reset_index(drop = True)
            out["frq_name"] = out.index
            out["frq_name"] = out["frq_name"].astype(str)
            if pivot : 
                out = out.pivot("part", "frq_name",  ["frequencies", "FFT"])
                result = result.append(out)
            else : 
                result = result.append(out)
            
    if pivot : 
        result.columns = ["_".join(col) for col in result.columns.values]
        result["part"] = result.index
        result = result.reset_index(drop = True)
        return result
    else : 
        result = result.reset_index(drop = True)
        return result

def get_max(df_fft, idi) :
    """
    Récupère les valeurs maximales de la FFT selon la catégories donnée
    Parameters
    ----------
    df_fft : DataFrame
        FFT d'un signal audio
    idi : String
        Nom de la catégorie

    Returns
    -------
    df : DataFrame
        Dataframe avec les valeurs maximales selon idi

    """
    df_fft = df_fft.reset_index(drop = True)
    grp = df_fft.groupby(idi, as_index = False)["FFT"].idxmax()
    df = df_fft.iloc[grp]
    df = df.reset_index(drop = True)
    
    return df
        
def detect_same(frq_max, offset, pivot, lenght) :
    """
    Détermine les 3 fréquences avec une marge de 2% qui possèdent les 3 plus
    grandes FFT   

    Parameters
    ----------
    frq_max : DataFrame
        Dataframe avec les valeurs maximales de la FFT 
        
    Returns
    -------
    out : DataFrame
        Dataframe avec les 3 fréquences selon les plus grandes FFT

    """
    n = 0
    frq_max = frq_max.sort_values(by = "FFT", ascending = False)
    list_duplicated = []
    for i in frq_max["frequencies"]:
        k = list(range(round(i - i * 0.02), round(i + i * 0.02))) 
        list_duplicated = list_duplicated + k
        if i in list_duplicated:
            frq_max["duplicated"] = n + 1
    frq_max = frq_max.loc[frq_max["duplicated"] == 1]
    out = frq_max.sort_values(by = "FFT", ascending = False)
    if pivot : 
        return out.head(lenght)
    else : 
        max_val = out.head(1)["FFT"]
        out = out.loc[out.FFT > int(max_val * offset)]
        return out
    

def recup_fonda(dic_fft, note) : 
    """
    Identifie les parties ou le signal comporte l'accord donné en argument

    Parameters
    ----------
    dic_fft : Dictionnaire
        Dictionnaire de FFT composé de chaque partie du signal
    note : String
        Accord recherché

    Returns
    -------
    df : DataFrame
        Dataframe avec les parties ou le signal comporte la note donné avec la 
        valeurs des fréquences et leurs FFT

    """
    df = pd.DataFrame()
    frq_fonda, frq_tierce, frq_quinte = list_frq(note)
    for i in dic_fft : 
        frq = dic_fft[i]
        frq = get_marker(frq)
        frq = frq.loc[frq.compar == True]
        if not(frq.empty) :
            frq_max = get_max(frq,"marker")
            frq_max = frq_max.sort_values("FFT", ascending = False)
            frq_max = frq_max.head(15)
            frq_max = frq_max.reset_index(drop = True)
            frq_max["id"] = frq_max.apply(lambda x : "fonda" if x.frequencies in (frq_fonda) else np.nan, axis = 1)
            if frq_max.id.nunique() > 0 : 
                frq_max.loc[(frq_max.frequencies.isin(frq_tierce)), "id"] = "tierce"
                frq_max.loc[(frq_max.frequencies.isin(frq_quinte)), "id"] = "quinte"
            frq_max = frq_max.dropna()
            frq_max = frq_max.drop_duplicates(["FFT", "id"], keep = "first")
            if(len(frq_max.id.unique())) :
                final = get_max(frq_max, "id")
                final["accord"] = note 
                final = final.pivot("accord", "id", ["frequencies", "FFT"])
                final["part"] = i 
                df = df.append(final)

    df.columns = ["_".join(col) for col in df.columns.values]
    df["target"] = df.index
    df = df.reset_index(drop = True)
    df = df.dropna()
    
    return df


def determine_chords(frq_test) :

    final = frq_test.copy()
    groups = final.groupby(["id", "song"], as_index = False)
    corrected_groups = groups.apply(lambda x : x.sort_values("FFT", 
                                                             ascending = False))
    corrected_groups = corrected_groups.groupby(["id", "song"], as_index = False)
    corrected_groups = corrected_groups.apply(lambda x : x.drop_duplicates("Note", 
                                                                           keep = "first"))
    corrected_groups = corrected_groups.reset_index(drop = True)
    final_bis = corrected_groups.copy()
    corrected_groups = corrected_groups.groupby(["id", "song"], as_index = False)
    without = corrected_groups.filter(lambda x : x.shape[0] == 2)
    without_groups = without.groupby(["id", "song"], as_index = False)
    fusion = pd.DataFrame()
    before_group = pd.DataFrame()
    next_group = pd.DataFrame()
    fus = pd.DataFrame()
    tuple_use = []
    for song, df in without_groups : 
        if not(song in tuple_use): 
            j = song[0]
            before_id = (j - 1, song[1])
            next_id = (j + 1, song[1])
            if before_id in corrected_groups.groups.keys() :
                before_group = corrected_groups.get_group(before_id).copy()
                before_group["part"] = "part " + str(int(j))
                before_group["id"] = j      
                tuple_use.append(before_id)            
            if next_id in corrected_groups.groups.keys() : 
                next_group = corrected_groups.get_group(next_id).copy()
                next_group["part"] = "part " + str(int(j))
                next_group["id"] = j
                tuple_use.append(next_id)
            fusion = df.append([before_group, next_group])
            fusion.sort_values("FFT", ascending = False)
            fusion = fusion.drop_duplicates(["Note"],keep =  "first")
        fus = fus.append(fusion)
        final_bis = final_bis.drop(corrected_groups.get_group(song).index)
    check = final_bis.append(fus)
    group_check = check.groupby(["id", "song"], as_index = False)
    terminator = pd.DataFrame()
    
    for i, j in group_check :
        tamp = group_check.get_group(i).copy()
        tamp = tamp.sort_values("FFT", ascending = False)
        tamp = tamp.drop_duplicates(["Note"],keep =  "first")
        tamp = tamp.head(5)
        tamp = tamp.reset_index(drop = True)
        tamp["frq_id"] = range(0, tamp.shape[0])
        #print(i)
        #print(tamp.shape[0])
        id_df = tamp[["id", "part", "song"]]
        tamp["id_song"] = id_df.apply(tuple, axis = 1)
        tamp = tamp.pivot("id_song", "frq_id", ["Note", "frequencies"])
        terminator = terminator.append(tamp)
    
    terminator.columns = [col[0] + "_" + str(col[1]) for col in terminator.columns.values]
    col = terminator.columns
    terminator = terminator.reset_index()
    infos = ["id", "part", "song"]
    terminator = terminator[col].join(terminator["id_song"].apply(lambda loc : pd.Series(loc, 
                                                                            index = infos)))
    terminator.iloc[:,:5] = terminator.fillna("")
    terminator.iloc[:,5:10] = terminator.fillna(0)
        
    return terminator
    
def decomposite(df_song, frequency, overlap_fac) : 
    """
    Décompose le signal audio en partie, selon la taille du fichier audio et 
    selon le pourcentage de recouvrement de chaque partie. Utilisation de 
    la sliding FFT basé sur le code de KevinNJ

    Parameters
    ----------
    df_song : Dataframe
        DataFrame du fichier audio 
    frequency : Int
        Fréquence d'échantillonnage
    overlap_fac : float
        Pourcentage de recouvrement entre chaque partie (compris en 0 et 1)

    Returns
    -------
    dic_result : Dictionnaire
        Dictionnaire de Dataframe de chaque partie du signal décomposé

    """
    fft_size = np.int(frequency / 2)
    slide_size = np.int(np.floor(fft_size * (1 - overlap_fac)))
    total_segments = np.int32(np.ceil(len(df_song) / np.float(slide_size)))
    
    window = np.hanning(fft_size)
    inner_pad = np.zeros(fft_size)
    
    proc = np.concatenate((df_song["value"], np.zeros(fft_size)))
    result = np.empty((total_segments, fft_size), dtype = np.float32)

    for i in range(total_segments) : 
        current_slide = slide_size * i 
        segment = proc[current_slide : current_slide + fft_size]
        windowed = segment * window 
        padded = np.append(windowed, inner_pad)
        spectrum = np.fft.fft(padded) / fft_size
        autopower = np.abs(spectrum * np.conj(spectrum))
        result[i:] = autopower[:fft_size]
        
    result = result.T
    result = pd.DataFrame(result)
    result.columns = ["part " + str(i) for i in result.columns]
    #result = result.drop(["part 0", "part 1"], axis = 1)
    dic_result = result.to_dict(orient = "Series")
    
    for i in dic_result : 
        dic_result[i] = pd.DataFrame(dic_result[i])
        dic_result[i]["frq"] = dic_result[i].index
        dic_result[i].columns = ["FFT", "frequencies"]
        

    return dic_result

