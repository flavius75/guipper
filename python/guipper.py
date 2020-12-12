# -*- coding: utf-8 -*-
"""
Created on Mon Sep 28 13:49:06 2020

@author: vicgu
"""

import pandas as pd 

def dataset_chords() : 
    """
    Génère un dataset comportant toutes les compositions possible pour chaque
    accord du fichier excel Frq_guitare.xlsx
    
    Parameters
    ----------
    None 
    
    Returns
    -------
    all_note : DataFrame
        DataFrame de données pour chaque accord
    
    """
    frq  = pd.read_excel("C:/Users/vicgu/OneDrive/Bureau/Guipper/Guipper/Frq_guitare.xlsx",
                         sheet_name = "Frq_Complete")
    accord = pd.read_excel("C:/Users/vicgu/OneDrive/Bureau/Guipper/Guipper/Frq_guitare.xlsx",
                         sheet_name = "Accord")

    fonda = accord.merge(frq, left_on= "Fondamental", right_on="Note")
    tierce = accord.merge(frq, left_on= "Tierce", right_on="Note")
    quinte = accord.merge(frq, left_on= "Quinte", right_on="Note")
    
    all_note = fonda.merge(tierce,  on = ["Accords", "Fondamental", "Tierce", "Quinte"] )
    all_note = all_note.merge(quinte,  on = ["Accords", "Fondamental", "Tierce", "Quinte"])
    all_note.columns=  ["Accord", "Fondamental", "Tierce", "Quinte",
                        "Frq_Fondamental", "Fonda", "Frette_Fonda", 
                        "Corde_Fonda", "Frq_Tierce", "Tier", "Frette_Tierce", 
                        "Corde_Tierce", "Frq_Quinte", "Quin", "Frette_Quinte", 
                        "Corde_Quinte"]
    all_note = all_note.drop(["Tier", "Fonda", "Quin"], axis = 1)
    all_note = all_note.loc[(all_note.Corde_Fonda != all_note.Corde_Quinte) & 
                            (all_note.Corde_Fonda != all_note.Corde_Tierce) & 
                            (all_note.Tierce != all_note.Corde_Quinte)]
    all_note = all_note.loc[(all_note.Frette_Fonda - all_note.Frette_Quinte).isin(list(range(0,4))) &
                            (all_note.Frette_Fonda - all_note.Frette_Tierce).isin(list(range(0,4)))]
    all_note = all_note.loc[(all_note.Frette_Fonda < 17) & (all_note.Frette_Quinte < 17) &
                 (all_note.Frette_Tierce  < 17)]
    all_note = all_note.reset_index(drop = True)

    return all_note

def data_notes() : 
    
    frq  = pd.read_excel("C:/Users/vicgu/OneDrive/Bureau/Guipper/Guipper/Frq_guitare.xlsx",
                     sheet_name = "Frq_Resume")
    full_frq = pd.DataFrame()
    for i in range(len(frq)) : 
        k = frq.iloc[i]["Frequence_Guitare"]
        value = list(range(int(round(k - k * 0.02)), int(round(k + k * 0.02))))
        df = pd.DataFrame({"Frequence" : value,
                           "Note" : frq.iloc[i]["Note"],
                           "Frette" : frq.iloc[i]["Frette"],
                           "Corde" : frq.iloc[i]["Corde"]})
        full_frq = full_frq.append(df)
    full_frq = full_frq.reset_index(drop = True)
    
    return full_frq
        
        
        