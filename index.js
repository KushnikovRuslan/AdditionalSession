async function main() {
  // технический метод для остановки времени
  const sleep = async (n) => new Promise((resolve) => setTimeout(resolve, n));

  let counter = 0;

  function func() {
    return ++counter;
  }
  
  // писть код тут
  function createCash(fn, ttl) {
    let cache = null;
    let lastUpdate = 0;
    
    return async function() {
      const now = Date.now();
      
      // Если кэш пуст или истекло время жизни
      if (cache === null || now - lastUpdate > ttl) {
        cache = await fn(); // Поддерживаем асинхронные функции
        lastUpdate = now;
      }
      
      return cache;
    };
  }

  // пример использования
  const myCash = createCash(func, 1000); // функция принимает на ход функцию для вызова, и время через которое значение становится неактуальным

  await sleep(1000);
  console.log(await myCash()); // 1
  console.log(await myCash()); // 1

  await sleep(3000);
  console.log(await myCash()); // 2
  console.log(await myCash()); // 2
}

main();
