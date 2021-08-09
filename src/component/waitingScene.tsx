import React, { useState } from "react"

export default function WaitingScene(){
    const phrases = [
        "Récolte des données météo",
        "Chargement des décors",
        "Toubonobo se prépare",
        "Toubonobo enfile un T-shirt, son pantalon",
        "Oups, il avait oublié son caleçon 🤭",
        "Mise en place des appâts pour oiseaux",
        "Ta connexion est sans doute un peu lente, attends encore un peu 😬"
    ];
    const [phrase, setPhrase] = useState<number>(0);

   setTimeout(()=>{
        if(phrase < phrases.length -1){
            setPhrase(phrase+1);
        }
    }, 3500);

    function renderPhrase(t: string, index: number){
        return (
        <div key={index} style={{color: "black"}}>
            {
                index < phrase ?
                 <span>{t} ✔️</span>
                 :
                 <span>{t}...</span>
            }
        </div>
       )
    }

    return (
        <>
            {
                phrases.filter((_phrase, index) => index <= phrase).map((t, index) => renderPhrase(t, index))
            }
        </>
    )
}