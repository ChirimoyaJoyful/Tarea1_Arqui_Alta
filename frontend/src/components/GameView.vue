<template>
    <div class="game-detail">
      <div class="item-image">
        <img :src="`/images/${game.id}.jpg`" alt="Imagen">
      </div>
      <div class="item-content">
        <p class="item-name">{{ game.gname }}</p>
        <p class="item-date">{{ formatDate(game.release_date) }}</p>
      </div>
      <button class="write-review-btn">Escribir reseña</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      game: {
        type: Object,
        required: true
      }
    },
    methods: {
      formatDate(date) {
        const formattedDate = new Date(date);
        const day = formattedDate.getDate().toString().padStart(2, '0');
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = formattedDate.getFullYear();
        return `${day}/${month}/${year}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .game-detail {
    text-align: center;
  }
  
  .item-image img {
    width: 300px; /* Tamaño deseado para la imagen grande */
    height: auto;
  }
  
  .write-review-btn {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .write-review-btn:hover {
    background-color: #0056b3;
  }
  </style>
  