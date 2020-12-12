# -*- coding: utf-8 -*-
"""
Created on Mon Oct 19 11:47:41 2020

@author: vicgu
"""
from sklearn.tree import DecisionTreeClassifier, plot_tree
import sklearn.preprocessing as prepro
import matplotlib.pyplot as plt
import read_sound as rd
import guipper as gui
import re
import pandas as pd
import sklearn.model_selection as ms
import numpy as np 
from sklearn import metrics
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV


#dic_chords, frq = rd.read_sound("son_chord/Do/")
#dic_song, frq = rd.read_sound("chanson/")

cla_note = RandomForestClassifier(n_estimators=  54, 
                                  criterion= "entropy",
                                  max_depth= 20, 
                                  min_samples_split=4)
le = prepro.LabelEncoder()
col_1 = ["DO", "RE", "MI", "FA", "SOL", "LA", "SI", 
         "DO#", "RE#", "MI#", "FA#", "SOL#", "LA#", '']
le.fit(col_1)

def get_data(dic_chords, dic_song, frq) : 

    note = ["Do Majeur", "Re Majeur", "Mi Majeur", "Fa Majeur", "Sol Majeur", 
            "La Majeur", "Si Majeur", "Do Mineur", "Re Mineur", "Mi Mineur", 
            "Fa Mineur", "Sol Mineur" ,"La Mineur", "Si Mineur", "Do# Majeur", 
            "Re# Majeur", "Fa# Majeur" , "Sol# Majeur", "La# Majeur", "Do# Mineur",
            "Re# Mineur", "Fa# Mineur", "Sol# Mineur", "La# Mineur"]

    dic_song_apart = {}
    for i in dic_song : 
        dic_song_apart[i] = rd.decomposite(dic_song[i], frq, 0.1)
    frequencies = pd.DataFrame()  
    for i in dic_song_apart : 
       for n in note :
            df = rd.recup_fonda(dic_song_apart[i], n)
            df["song"] = i 
            frequencies = frequencies.append(df)
    frequencies["id"] = frequencies["part_"].str.replace(r"\D+", "").astype(int)
    frequencies = frequencies.dropna(subset= ["FFT_fonda", "FFT_quinte", 
                                              "FFT_tierce", "frequencies_fonda", 
                                              "frequencies_quinte", "frequencies_tierce"])
    frq_groups = frequencies.groupby("song", as_index = False)
    frq_final = pd.DataFrame()
    for song, df_song in frq_groups : 
        df = df_song.groupby("part_", as_index = False)
        for part, df_part in df : 
            frame = df_part.copy()
            frame.loc[:, "somme"] = np.sum(frame[["FFT_fonda", "FFT_tierce", 
                                               "FFT_quinte"]], axis = 1)
            frame = frame.loc[frame.somme == max(frame.somme)]
            frq_final = frq_final.append(frame)
    frq_final = frq_final.sort_values(by = ["song", "id"])
    dic_do = rd.fft(dic_chords, frq)
    do_minor = {key :dic_do[key] for key in dic_do.keys() if re.search("m", key)}
    do_major = {key :dic_do[key] for key in dic_do.keys() if re.search("M", key)}
    test_do_minor = rd.recup_fonda(do_minor, "Do Mineur")
    test_do_major = rd.recup_fonda(do_major, "Do Majeur")
    df_do = pd.concat([test_do_major, test_do_minor])
    out = pd.concat([frq_final, df_do])
    out.to_excel('decisional_data.xlsx')
    
    return out
      
def get_data_predict(dic_chords, dic_song, frq, offset, bool_off, lenght):
    
    dic_song_apart = {}
    for j in dic_song : 
        dic_song_apart[j] = rd.decomposite(dic_song[j], frq, 0.1)
    frequencies = pd.DataFrame()
    for i in dic_song_apart : 
         df = rd.recup_for_predict(dic_song_apart[i], offset, bool_off, lenght)
         df["song"] = i 
         frequencies = frequencies.append(df)
    frequencies["id"] = frequencies["part"].str.replace(r"\D+", "").astype(int)   
    frq_final = frequencies.sort_values(by = ["song", "id"])
    dic_do = rd.fft(dic_chords, frq)
    df_do = rd.recup_for_predict(dic_do, offset, True, lenght)
    frq_test = pd.concat([frq_final, df_do])

    return frq_test

def join_data(frq_test, bool_off) : 
    
    if bool_off :
        out = gui.dataset_chords()
        frq_final = pd.read_excel('decisional_data.xlsx')
        sortie = out[["Accord", "Frq_Fondamental", "Frq_Tierce", "Frq_Quinte",
                      "Fondamental", "Tierce", "Quinte"]]
        sortie.columns = ["target", "frequencies_0", "frequencies_1", 
                          "frequencies_2", "Note_0", "Note_1", "Note_2"]
        sortie["part"] = " "
        sortie["song"] = " "
        data = frq_test.merge(frq_final[["song", "part_", "target"]], 
                              right_on= ["song", "part_"], 
                              left_on= ["song", "part"])
        data = data.drop("part_", axis = 1)
        data = data.append(sortie)
        data = data.fillna(0)
        
        return data
    else : 
        notes = gui.data_notes()
        data = frq_test.merge(notes, left_on = "frequencies", right_on = "Frequence", 
                       how = "left")
        na_value = data.loc[data.Note.isna()]
        data = data.dropna()
        
        return data, na_value
    
def learning_set(frq_test, lenght, bool_off) :
    

    if bool_off :

        X = frq_test.iloc[:, :lenght]
        #X.iloc[:, :int(lenght/2)] = prepro.normalize(X.iloc[:, :int(lenght/2)])
        y = frq_test.target
        X_train, X_test, y_train, y_test = ms.train_test_split(X, y)

    else : 
        X = frq_test.iloc[:,:5].copy()
        X = X.replace(to_replace = 0, value = '')
        X = X.apply(lambda x : le.transform(x))
        #X[["FFT"]] = prepro.normalize(X["FFT"])
        y = frq_test.target
        X_train, X_test, y_train, y_test = ms.train_test_split(X, y)
        
    return X, y, X_train, X_test, y_train, y_test


def comparative(dic_chords, dic_song, frq, j, k, bool_off) : 
    
    training = {}
    if bool_off : 
        lenght = list(range(j, k))
        for i in lenght : 
            df = get_data_predict(dic_chords, dic_song, frq,  
                                  0, bool_off, i)
            df = join_data(df, bool_off)
            df = df.sort_index(axis = 1)
            X, y, X_train, X_test, y_train, y_test = learning_set(df, i*2, bool_off)
            training["data_" + str(i)] = {"X" : X,
                                          "y" : y,
                                          "X_train" : X_train,
                                          "X_test" : X_test,
                                          "y_train" : y_train,
                                          "y_test" : y_test,
                                          "df" : df}
        
    else :
        offset = np.arange(j, k, 0.05)
        for i in offset : 
            df = get_data_predict(dic_chords, dic_song, frq,  
                                  i, bool_off, 0)
            original = df.copy()
            df, na_val = join_data(df, bool_off)
            cla_note.fit(df[["frequencies", "FFT"]], df.Note)
            na_val["Note"] = cla_note.predict(na_val[["frequencies", "FFT"]])
            df = df.append(na_val)
            df = rd.determine_chords(df)
            only_note = df.loc[df.Note_1 == ""]
            df = df.loc[df.Note_1 != ""]
            df = join_data(df, True)
            X, y, X_train, X_test, y_train, y_test = learning_set(df, 0, bool_off)
            training["data_" + str(i)] = {"X" : X,
                                          "y" : y,
                                          "X_train" : X_train,
                                          "X_test" : X_test,
                                          "y_train" : y_train,
                                          "y_test" : y_test,
                                          "Note_only" : only_note,
                                          "Original_data" : original,
                                          "df" : df}
            
    return cla_note, training
    
def cross_validated(X, y) :
    
    comparative = []
    model_parameters = {"decisional_tree" :  
                        {"model" : DecisionTreeClassifier(), 
                         "parameter" : {"criterion" : ["entropy", "gini"], 
                                        "max_depth" : [13, 14, 15, 17, 20], 
                                        "min_samples_split" : [3,4,5,6],
                                        }
                         },
                         "RandomForest" : 
                        {"model" : RandomForestClassifier(),
                         "parameter" : {"n_estimators" : [40, 45, 50, 54, 55,
                                                          57, 60],
                                        "criterion" : ["entropy", "gini"], 
                                        "max_depth" : [13, 14, 15, 17, 20], 
                                        "min_samples_split" : [3,4,5,6]
                                       }
                         }}
    
    for model, mp in model_parameters.items() : 
        clf_CG = GridSearchCV(mp["model"], mp["parameter"])
        clf_CG.fit(X,y)
        comparative.append({"model" : model,
                            "best_score" : clf_CG.best_score_, 
                            "params" : clf_CG.best_params_})
        
    return comparative


def cross(dic_chords, dic_song, frq, j, k, bool_off) :

    cla_note, training = comparative(dic_chords, dic_song, frq, j, k, bool_off)
    cross_valid = {} 
    for i in training : 
        cp = cross_validated(training[i]["X"], training[i]["y"])
        cross_valid[i] = cp
        
    return training, cross_valid
        

def infos(clf, training) :
    
    dic = {}
    
    for i in training : 
        clf.fit(training[i]["X_train"], training[i]["y_train"])
        y_pred = clf.predict(training[i]["X_test"])
        dic[i] = {"model" : clf,
                  "cross_values" : cross_val_score(clf, training[i]["X"], 
                                                   training[i]["y"]),
                  "scores" : clf.score(training[i]["X_test"], training[i]["y_test"]),
                  "report" : metrics.classification_report(training[i]["y_test"], 
                                                           y_pred),
                  "important_features" : clf.feature_importances_
                  }

    return dic









