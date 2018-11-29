// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAyEsS8gJOgZaj3c9e_VJjzeujfgZtDulc',
  authDomain: 'comment-31c35.firebaseapp.com',
  databaseURL: 'https://comment-31c35.firebaseio.com',
  projectId: 'comment-31c35',
  storageBucket: 'comment-31c35.appspot.com',
  messagingSenderId: '581420941825'
};
firebase.initializeApp(config);

const storageService = firebase.storage();
const storageRef = storageService.ref();

const database = firebase.database();

const vm = new Vue({
  el: '#app',

  data: () => {
    return {
      name: '',
      from: '',
      img: '',
      text: '',
      counter: 0,
      comments: []
    };
  },
  created: function() {
    this.getComments();
  },

  methods: {
    saveData: function(snapshot) {
      this.comments = [];
      let value = snapshot.val();
      Object.entries(value).map(([key, v]) => {
        this.comments.push(v);
      });
      console.log(this.comments);
    },
    getComments: function() {
      console.log('Get Data');
      database.ref('comments').on('value', this.saveData);
    },
    addButton: function() {
      console.log('OK');
      if (this.name && this.from && this.text && this.img) {
        var messageListRef = database.ref('comments');
        var newMessageRef = messageListRef.push();
        newMessageRef.set({
          name: this.name,
          from: this.from,
          text: this.text,
          img: this.img,
          remove: false
        });
        this.getComments();
      } else {
        alert('Заполните все поля');
      }
    }
  }
});
