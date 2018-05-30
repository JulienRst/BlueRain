import './main.scss'
import blueRain from './bluerain'

window.onload = () => {
  // BlueRain (elem: HTMLElement, optWidth: Number, optHeight: Number, marge: Number)
  // elem : l'endroit où on va dessiner notre pluie
  // optWidth; optHeight : la taille voulue pour les tuiles (sachant que ce sera adapté au conteneur)
  // marge : la marge que tu utilises dans ton css pour les tuiles
  blueRain(document.getElementById('container'))
}
