import './infrastructure/connect_mongoose'


(async () => {
    const check = process.env.CHECK;
    const env = process.env.NODE_ENV;
    console.log('check : ', check);
    console.log('env : ', env);
})();
