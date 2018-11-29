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

const database = firebase.database();

const vm = new Vue({
  el: '#root',

  data: () => {
    return {
      comments: []
    };
  },

  created: function() {
    this.createMap();
  },
  methods: {
    createMap: function() {
      console.log('Ok');
      database.ref('comments').on('value', this.saveData);
    },
    saveData: function(snapshot) {
      let value = snapshot.val();
      Object.entries(value).map(([key, v]) => {
        this.comments.push(v);
      });
      console.log(this.comments);
    }
  }
});
