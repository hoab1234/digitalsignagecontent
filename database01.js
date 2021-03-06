var mongoose = require('mongoose');

module.exports = {
    connect: function () {
      mongoose.connect('mongodb+srv://kkj:qwe789zxc123@cluster0.abexk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
      }).then(() => console.log('MongoDB connected...'))
      .catch(error => console.log(error))
    },
    // disconnect: function (){
    //   mongoose.disconnect();
    // }
}
