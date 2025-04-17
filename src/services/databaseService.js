import axios from 'axios';

export async function resetDatabase() {
  let message = '';  // Déclarez les variables en local
  let messageClass = '';  // Déclarez les variables en local

  try {
    const response = await axios.post('http://localhost:3000/api/reset');
    
    // Mise à jour de l'état dans le composant Vue
    message = response.data.message;
    messageClass = message.includes('succès') ? 'success' : 'error';
  } catch (error) {
    console.error(error);
    message = 'Erreur lors de la réinitialisation de la base de données';
    messageClass = 'error';
  }

  return { message, messageClass };  // Retournez les valeurs pour utilisation dans le composant Vue
}
