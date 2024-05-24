<template>
  <div id="app" style="margin-top: 60px">
    <div class="container">
      <button class="add-game-btn" @click="openAddGame">Agregar Juego</button>
      <div class="item" v-for="(item, index) in items" :key="index" @click="openOverlay(item)">
        <div class="item-content">
          <div class="item-image" :style="{ backgroundImage: `url('/${item.id}.jpg')`, transform: item.zoom ? 'scale(1.2)' : 'scale(1)' }">
            <div class="item-name-overlay">{{ item.gname }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="overlay" v-if="overlayItem" @click.self="closeOverlay">
      <div class="overlay-content" @click.stop>
        <div class="overlay-image" :style="{ backgroundImage: `url('/${overlayItem.id}.jpg')` }"></div>
        <div class="overlay-details">
          <h2 class="overlay-name">{{ overlayItem.gname }}</h2>
          <textarea class="overlay-textarea" v-model="overlayItem.text" placeholder="Escribe tu reseña aquí..."></textarea>
          <div class="overlay-buttons" :class="{ 'centered': !overlayItem.comment }">
            <button v-if="!overlayItem.comment" @click="publishReview(overlayItem.id, overlayItem.text)">Publicar</button>
            <button v-if="overlayItem.comment" @click="publishReview(overlayItem.id, overlayItem.text)">Editar</button>
            <button @click="deleteGame(overlayItem.id)" style="background-color: red; color: white;">Eliminar Juego</button>
          </div>
        </div>
        <button class="close-btn" @click="closeOverlay">Cerrar</button>
      </div>
    </div>

    <div class="overlay" v-if="addingGame" @click.self="closeAddGame">
      <div class="overlay-content" @click.stop>
        <div class="add-game-form">
          <h2>Agregar Nuevo Juego</h2>
          <input v-model="newGame.name" type="text" placeholder="Nombre del juego" />
          <input v-model="newGame.date" type="date" placeholder="Fecha de lanzamiento" />
          <div class="overlay-buttons centered">
            <button @click="publishGame">Publicar</button>
            <button @click="closeAddGame">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  setup() {
    const items = ref([]);
    const overlayItem = ref(null);
    const reviewText = ref('');
    const addingGame = ref(false);
    const newGame = ref({ name: '', date: '' });

    axios.get('http://localhost:3000/allgames')
      .then(response => {
        items.value = response.data.map(item => ({
          ...item,
          zoom: false,
        }));
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });

    const openOverlay = (item) => {
      overlayItem.value = item;
      reviewText.value = overlayItem.value.comment;
      overlayItem.value.text = reviewText.value;
    };

    const closeOverlay = () => {
      overlayItem.value = null;
      reviewText.value = '';
    };

    const openAddGame = () => {
      addingGame.value = true;
    };

    const closeAddGame = () => {
      addingGame.value = false;
      newGame.value = { name: '', date: '' };
    };

    const publishReview = (id, text) => {
      axios.put('http://localhost:3000/review/', { id, text })
        .then(response => {
          console.log('Review published:', response.data);
          overlayItem.value.comment = text;
          closeOverlay();
        })
        .catch(error => {
          console.error('Error de reseña', error);
        });
    };

    const deleteGame = (id) => {
      console.log(id);
      axios.delete(`http://localhost:3000/delete/${id}`)
        .then( () =>{
          console.log('Eliminado Juego de ID:', id);
        })
        .catch(error => {
          console.error('Error al eliminar', error)
        })
      closeOverlay();
    };

    const publishGame = () => {
      axios.post('http://localhost:3000/addgame', { name: newGame.value.name, date: newGame.value.date })
        .then(response => {
          console.log('Game published:', response.data[0]);
          response = response.data[0]
          items.value.push({ id: response.id, gname: newGame.value.name, date: newGame.value.date, zoom: false });
          closeAddGame();
        })
        .catch(error => {
          console.error('Error publishing game:', error);
        });
    };

    return {
      items,
      overlayItem,
      reviewText,
      addingGame,
      newGame,
      openOverlay,
      closeOverlay,
      openAddGame,
      closeAddGame,
      publishReview,
      deleteGame,
      publishGame,
    };
  },
};
</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
}

.add-game-btn {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-game-btn:hover {
  background-color: #0056b3;
}

.item-content {
  position: relative;
}

.item-image {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.item:hover .item-image {
  transform: scale(1.1);
}

.item-name-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px;
  text-align: center;
  font-weight: bold;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered {
  display: flex;
  justify-content: center;
}

.overlay-content {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
}

.overlay-image {
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
}

.overlay-details {
  margin-top: 20px;
}

.overlay-name {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}

.overlay-textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  margin-bottom: 10px;
}

.overlay-buttons {
  display: flex;
  justify-content: space-between;
}

.overlay-buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.overlay-buttons button:hover {
  background-color: #007bff;
  color: white;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: #0056b3;
}

.add-game-form {
  display: flex;
  flex-direction: column;
}

.add-game-form input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
