//inferencia
//como a y b infieren en que son number sin decirle nada
const a = 1;
const b = 2;
const c = a + b;
// c tambien será number

let textString = 'hello';

textString.toLocaleLowerCase();

// textString = 2 -> ❌  estaría mal
// textString.propInexistente -> ❌  estaría mal
//any

let obj: any = { x: 0 };

obj.foo();
obj();
obj.bar = 100;
obj = 'hello';
const n: number = obj;

{/* FUNCTIONS
 function greet(name: string) {
     console.log(`Hello ${name}`);
 }

 greet("Diego");
 greet(3) ->  ❌  error

 function greet({ name, age }: { name: string, age: number }) { ✅ forma #1  CORRECTA de tipar los parametros
     `Hello $${name}, you are ${age} year old`
 }
 greet({ name: 'Diego', age: 2 })

 function greet(person: { name: string, age: number }) {  ✅ forma #2 CORRECTA de tipar los parametros
    const {name, age} = person -> luego toca instanciarlo o destructurarlo
     `Hello $${name}, you are ${age} year old`
 }
 greet({ name: 'Diego', age: 2 })

 function greet(name: string, age: number) {  --> ❌ forma INCORRECTA de tipar los parametros
     `Hello $${name}, you are ${age} year old`
 }
 greet({ name: 'Diego', age: 2 })

 function greet(person: { name: string, age: number }): string {  Le estoy diciendo que me retornará un string
     const { name, age } = person
     console.log(`hello I am ${name} and I am ${age} year old`);
     return age ❌ por lo cual si aquí retorno number me dará error
 }

 let username: string;
 username = greet({ name: 'pepe', age: 2 })

 */}

{/* FUNCTIONS CALLBACK

    const sayHiFromFunction = (fn: Function) => { --->> ⚠️ esta forma de tipar una funcion es mejor evitarla
        return fn('Diego')
    }
    sayHiFromFunction((name: string) => {
        console.log(`hello ${name}`);
    })

    ✅Forma #1️⃣ correcta de tipar una funcion que recibe como  parametro un callback

    const sayHiFromFunction = (fn:(name: string) => void) => { le decimos que tiene un parametro que es un string y que no devuelve nada
        return fn('Diego')
    }
    const sayHi (name: string) => {
        console.log(`Hello ${name}`)
        return 3 // en este caso si le ponemos que retorna un number typeScript lo ignora, eso lo hace por el void
    }

    sayHiFromFunction(sayHi)

    ✅Forma #2️⃣ correcta de tipar una funcion que recibe como  parametro un callback

    const sayHiFromFunction = (fn:(name: string) => string) => {le decimos que tiene un parametro que es un string y que no devuelve un string 
        return fn('Diego')
    }
    const sayHi (name: string) => {
        console.log(`Hello ${name}`)
        return 3 // pero en este caso daria error porq en la funcion le decimos quee retornará un strin y está retornado un number 
                pero si ponemos que retorna un string todo se arregla ya que fue lo que definimos que ina retornar la funcion
    }

    sayHiFromFunction(sayHi)
*/}

{/* tipar anonymous functions

const sum = (a: number, b: number): number => { ✅Forma #1️⃣
    return a + b
}

const subtraction: (a: number, b: number) => number = (a, b) => { ✅Forma #2️⃣
    return a - b
}

 */}



{/* never --> Se utiliza para funciones que sabemos que nunca van a devolver nada es decir nunca devolver nada
    function throwError(message: string): never {
        throw new Error(message)
    };
 */}


{/*//inferencia funciones aninimas según el contexto
    const avengers = ['Spider', 'Hulk', 'avengers'];

    avengers.forEach((avenger) => {
        console.log(avenger.toLocaleUpperCase);
    }) // en este caso por inferencia no pide tipado ya que como estamos trabajando con un  array de string TypeScript mediante la
    //inferencia detecta que estoy trabajando con un array de string
 */}

//OBJETOS

// let hero = {
//     name: 'Thor',
//     age: 1500
// }
// function createHero(name: string, age: number) {
//     return { name, age }
// }
// createHero('Thor', 1500)


{/*//Type Alias
    type Hero = { --> declaramos el alias tipandos los parametros o propiedades que vas a usar, es decir definimos la estructua de un objeto
        name: string,
        age: number,
    }

    let hero: Hero = { --> lo instanciamos diciendo que let hero va tener la estructura de Hero -> let hero:Hero
        name: 'Thor',
        age: 1500
    }
    function createHero(hero: Hero): Hero { igual en esta funcion de createHero instanciamos hero:Hero esto quiere decir que los parametros que recibirá esta funcion será name y age que son 
                 los que se definen en la estructura Hero, y se indica que lo que retornará será un Hero, es decir un objeto con la estructura declarada anteriormente

        const { name, age } --> hero  intanciamos o destructuramos name y age de hero
        return { name, age } --> lo retornamos
    }
    const Thor = createHero({ name: 'Thor', age: 1500 }) y así lo creamos
*/}

{/*  //OPTIONAL PROPERTIES
    type HeroId = `${string}-${string}-${string}-${string}-${string}`  // TEMPLATE UNION TYPE --> basicamente es una estructura para definir una platilla y asegurarnos que  lo que resivamos sea 
    //tal cual o cumpla con la estructura establecida en TEMPLATE UNION TYPE

    type Hero = {
        readonly id?: HeroId,  //el readonly indica que el valor no se pueda modificar despues de su inicialización
        // como segundo Recibe HeroId que fue el TEMPLATE UNION TYPE creado anteriormente, es decir que este id tendria que cunplir con la estructura contemlada en HeroId
        name: string,
        age: number,
        isActive?: boolean // el signo de interrogacion o "optional chaining operator" porq no en todos los objetos está isActive y esto causará errores si no pongo el "optional chaining operator" 
        // basicamente le decimos que si isACtive existe? será un boolean sino  no pasa nada
    }

    let hero = {
        name: 'Thor',
        age: 1500
    }
    function createHero(hero: Hero): Hero {
        const { name, age } = hero;

        return {
            id: crypto.randomUUID(), // es decir que este id tendria que tener un id con la siguiente estructua ejmplo -> "abc-123-def-456-xyz" 
            //parecido a lo establecido en HeroID --> `${string}-${string}-${string}-${string}-${string}` de no tener eta estructura marcaria como un error dentro de TypeScript
            name,
            age,
            isActive: true
        } // crypto.randomUUID() --> usando un generador de números aleatorios criptográficamente seguro.
    }
    const thor = createHero({ name: 'thor', age: 1500 })
    console.log(thor.isActive) // -->  true
    thor.id
 */}


{/*// TEMPLATE UNION TYPE
    type HeroId = `${string}-${string}-${string}-${string}-${string}`
    type HeroPowerScale = 'local' | 'planetary' | 'galactic' | 'univerersal' | 'multiversal'

    type Hero = {
        readonly id?: HeroId,
        name: string,
        age: number,
        isActive?: boolean,
        powerScale?: HeroPowerScale
    }

    let hero = {
        name: 'Thor',
        age: 1500
    }
    function createHero(hero: Hero): Hero {
        const { name, age } = hero;

        return {
            id: crypto.randomUUID(),
            name,
            age,
            isActive: true
        }
    }
    const thor = createHero({ name: 'thor', age: 1500 })
    thor.powerScale = "local"  
*/}

//Arrays

// const lenguages: string[] = []; //forma #1️⃣ de tipar
// const lenguages1: Array<string> = []; //forma #12️⃣ de tipar
// const lenguages2: (string | number)[] = []; //forma #1️⃣ de tipar  pero con 2 valores string y number

// lenguages.push('javaScript')   




{/*  A CONTINUACÍON LES MOSTRARÉ LOS TUPLES

    //[   // --->Simplemnete es un array de strin para tenerlo como referencias
    //    ['X', 'O', 'X'], <- //string
    //    ['O', 'X', 'O'], <- //string
    //    ['X', '', 'O'],  <- //string
    //]


    type CelValue = 'X' | 'O' | ''; --> esto seria un 'Template Union Type' o condicion la cual solo permitira strin con los valores "X", "O", ""
    type GameBoard = [ --> seguidamente creamos otro 'Template Union Type' el cual es un array de arrays que contienen strings;
        [CelValue, CelValue, CelValue], --> en este caso dentro de los arrays ponemos el 'Template Union Type' que es igual CelValue y lo repetimos 3 veces es decir los estamos
        [CelValue, CelValue, CelValue],     condicionando diciento que este array solo deberá tener 3 valores o 3 indices los cual deberian ser tipo string y ademas tienen que ser
        [CelValue, CelValue, CelValue]      algunos de los que se declararon en CelValue que son "X", "O", "", de lo contrario marcará error ❌

    ]

    const gameBoard: GameBoard = [ // --> aqui declaramos una constante y la tipamos con GameBoard, las culeas tiene que cumplir con lo plasmado en ahí: a esto se le llama TUPLES
        ['X', 'O', 'O'],                  a continuación mas ejemplos
        ['O', 'X', 'O'],
        ['X', '', 'O']
    ]

    const [hero, setHero] = useState('thor')  // --> un ejemplo claro de lo que serú un TUPLE son los  useState en react, los cuales solo llevan dos parametros en este caso el hero y el setHero
                                              //     si se pone uno más dará error ❌ --> a continuacion un ejemplo claro

    Los rgb(223, 230, 0) son un claro ejemplo de lo que son los Duples  ya que solor cuentan con 3 parametros de numeros, del 0 al 255 

    type RGB = [number, number, number]; //--> creamos un template Union Type RGB el cual le decimos que va ser un array con solo 3 parametros los cuales si o si tienen que ser de tipo number

    const rgb: RGB = [255, 250, 0] //     --> caso 1️⃣--✅ correcto ya que cumple con las condiciones, tiene 3 parametros y todos son tipo number
    const rgb1: RGB = [255, 250, '4'] //  --> caso 2️⃣--❌ error ya que no cumple las condiciones, aunque tiene 3 parametros no todos son de tipo number, el ultimo es tipo string
    const rgb2: RGB = [255, 250, 0, 20] //--> caso 3️⃣--❌ error porque tiene 4 parametros y lo establecido en el 'template union type' son 3 parametros
*/}