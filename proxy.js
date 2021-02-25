// const person={
//   name:'Maksym',
//   age:30,
//   phone:'050-456-19',
//   job:'student',
// }
// const personProxy=new Proxy(person,{
//   get(target,prop){
//     if(!(prop in target)){
//       return prop
//       .split('_')
//       .map(p=>target[p])
//       .join('-');
//     }
//     return target[prop];
//   },
//   set(target,prop,value){
//     target[prop]=value;
//   }
// })
// class Student{
//   constructor(name,age,cafedra){
//     this.name=name;
//     this.age=age;
//     this.cafedra=cafedra;
//   }
// }
// const StudentProxy=new Proxy(Student,{
//   construct(target,args){
//     console.log('proxy constructor..')
//     return new Proxy(new target(...args),{
//       get(targ,prop){
//         if(!(prop in targ)){
//           return prop
//           .split('_')
//           .map(p=>targ[p])
//           .join('-');
//         }
//         return targ[prop];    
//       },
//     set(targ,prop,value){
//       targ[prop]=value;
//     }
//     });
//   }
// });
// const st=new StudentProxy('Maksym',34,'programming');
// const st2=new StudentProxy('Ivan',24,'Disaner');
// const printText=text=>`${text}`;
// const printProxy=new Proxy(printText,{
//   apply(target,argThis,args){
//     console.log('proxy...')
//     return target
//     .apply(argThis,args)
//     .toUpperCase();
//   }
// });
// console.log(printProxy('hello'));
// const withDefaultValue=(target,defaultValue=0)=>{
//   return new Proxy(target,{
//     get:(target,prop)=>{return prop in target
//      ?target[prop]:defaultValue}
//   });
// };
// const position=withDefaultValue({
//   x:25,
//   y:40,
// },0);
// const withHiddenProp=(target,prefix='_')=>{
//   return new Proxy(target,{
//     has:(obj,prop)=>prop in obj&&!prop.startsWith(prefix),
//     ownKeys:obj=>Reflect.ownKeys(obj)
//     .filter(p=>!p.startsWith(prefix)),
//     get:(obj,prop,receiver)=>(prop in receiver ? obj[prop] :void 0)
//   });
// };
// const person = withHiddenProp({
//   name:'Maksym',
//   age:35,
//   _id:12345678,
// });
// console.log(person);
// console.log('_id' in person);
// for (let key in person) {
//   console.log(key);
// }

// const arrProxy=new Proxy(Array,{
//   construct(target,[args]){
//     const index={};
//     args.forEach(element =>index[element.id]=element); 
//     return new Proxy(new target(...args),{
//       get(arr,prop){
//        switch (prop) {
//          case 'push':return item=>{
//           index[item.id]=item;
//            arr['push'].call(arr,item)};
//            case 'getById':return id=>index[id];
//         default:
//            return arr[prop];
//        }
//       }
//     });
//   }
// });
//   const users=new arrProxy([
//     {id:12,name:'Maksym',job:'fullstyack',age:39},
//     {id:24,name:'Ivan',job:'desainer',age:42},
//     {id:33,name:'Anna',job:'frontend',age:25},
//     {id:41,name:'Vitali',job:'devops',age:47},
//   ]);
//   users.push({id:222,name:'Alex'});
//   users[4];
//   for (let i = 0; i < users.length; i++) {
//      console.log(users.getById(users[i].id));
//   }