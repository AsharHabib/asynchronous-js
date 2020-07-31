const order = false;
const breakfastPromise = new Promise((resolve, reject)=>{
  setTimeout(()=> {
    if (order) {
      resolve('your order is ready so get it');
    } else {
      reject(Error('nah lol i z u'));
    }
  }, 3000)
});

breakfastPromise
  .then(val => console.log(val))
  .catch(err => console.log(err));
