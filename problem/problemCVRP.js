'use strict';


////Ciudades/Clientes -> 0,1,2 ... n
//Matriz de costes (incluye también al almacén)
//De 0 a 0 = x distancia
//De 0 a 1 = y distancia .....

//customersArray no incluye almacén


class ProblemCVRP{
    constructor() {}    
    static fromJSON(p){
        var problem = new Common.Elements.ProblemCVRP();
        problem.matrixCost=p.matrixCost;
        problem.customersArray=p.customersArray;
        for (var i=0;i<problem.customersArray.length;i++){
            problem.customersArray[i]=Common.Elements.Customer.fromJSON(problem.customersArray[i]);
        }
        problem.truckCapacity=p.truckCapacity;
        problem.truckTime=p.truckTime;
        problem.penalCap=p.penalCap;
        problem.penalTime=p.penalTime;
        problem.targetFitness=p.targetFitness;
        problem.tfKnown=p.tfKnown;
        problem.fitnessCounter=p.fitnessCounter
        return problem;        
    }

    initialize(matrixCost,customersArray, truckCapacity, truckTime, penalCap, penalTime){
        this.matrixCost=matrixCost;
        this.customersArray = customersArray;
        this.truckCapacity = truckCapacity;
        this.truckTime=truckTime;
        this.penalCap=penalCap;
        this.penalTime=penalTime;
   
    	this.targetFitness = -999999.9;
    	this.tfKnown = false;
    	this.fitnessCounter = 0;        
    }
    
    evaluateStep(indiv){
	    this.fitnessCounter++;
        return this.evaluate2(indiv);
    }


 //    evaluate2(indiv){
 //        var problem = this;

 //        var routeItemsArray=[];
 //        var routeItems=0;
 //        var routeTime=0;
 //        var totalTime=0;
 //        var totalItems=0;        
 //        var routeFitness=0;
 //        var fitness=0;

 //        var posCustomer;
 //        var posCustomer2;
 //        var customer;

 //        var origin;
 //        var destiny; 





 //        var totalCustomers=problem.customersArray.length;

 //        function isSeparator(indexCustomer){

 //                if (indexCustomer>=totalCustomers){
 //                    return true;
 //                }    else {
 //                    return false;
 //                }
 //        }


 //        function startRoute(origin){ //Desde almacén hasta primer cliente
 //            routeTime+=problem.matrixCost[0][origin]; 
 //            isNewRoute=false;
 //        }

 //        function endRoute(){
 //            isNewRoute=true;
 //            totalTime+=routeTime; //TODO -> totalTime no sé está utilizando.
 //            totalItems+=routeItems;            

 //            routeItemsArray.push(routeItems);

 //            routeFitness=routeTime;
 //            if ((routeTime-problem.truckTime)>0){ //Si pasamos el límite de tiempo.
 //                routeFitness+=(routeTime-problem.truckTime)*problem.penalTime;
 //            }            

 //            if ((routeItems-problem.truckCapacity)>0){ //Si pasamos el límite de capacidad.
 //                routeFitness+=(routeItems-problem.truckCapacity)*problem.penalCap;
 //            }  


 //            indiv.routeTime=totalTime;
 //            indiv.totalItems=totalItems;
 //            indiv.routeItems=routeItems;
 //            indiv.routeItemsArray=routeItemsArray;            
 //            fitness+=routeFitness;


 //            routeTime=0;
 //            routeItems=0;
 //            routeFitness=0;
 //        }

 //        var isNewRoute=true;

 //        for (var i=0;i<indiv.getChromosome().getSize()-1;i++){
 //            posCustomer=indiv.getChromosome().getAllele(i);
 //            posCustomer2=indiv.getChromosome().getAllele(i+1);
 //            if (isSeparator(posCustomer)){ //¿es separador el origen?
 //                endRoute();
 //            } else if (isSeparator(posCustomer2)){//¿es separador el destino?
 //                //entonces vamos al almacén
 //                origin=posCustomer+1; //matrixCost
 //                 if (isNewRoute){
 //                    startRoute(origin);
 //                }
 //                routeTime+=problem.matrixCost[origin][0];  

 //                customer = problem.customersArray[posCustomer]
 //                routeTime+=customer.getDeliveryTime();  
 //                routeItems+=customer.getDeliveryItems();           
 //            } else{
 //                //entonces sumamos ese camino
 //                origin=posCustomer+1; //matrixCost
 //                if (isNewRoute){
 //                    startRoute(origin);
 //                }                
 //                destiny=posCustomer2+1; //matrixCost
 //                routeTime+=problem.matrixCost[origin][destiny]; 

 //                customer = problem.customersArray[posCustomer]
 //                routeTime+=customer.getDeliveryTime();  
 //                routeItems+=customer.getDeliveryItems();                                                 
 //            }
 //        }


 //            posCustomer=indiv.getChromosome().getAllele(indiv.getChromosome().getSize()-1);
 //            if (isSeparator(posCustomer)){ //¿es separador el origen?
 //                endRoute();
 //            } else{
 //                //entonces sumamos ese camino
 //                origin=posCustomer+1; //matrixCost
 //                routeTime+=problem.matrixCost[origin][0]; 

 //                customer = problem.customersArray[posCustomer]
 //                routeTime+=customer.getDeliveryTime();    
 //                routeItems+=customer.getDeliveryItems();                  

 //                endRoute();                          
 //            }

 //            //fitness=totalTime*(-1);
 //            fitness=fitness*(-1);

 //            indiv.setFitness(fitness);
 //    }

 // }




//     evaluate2(indiv){
//         var problem = this;

//         var routeElementsArray=[];
//         var routeElements=[];

//         var routeItemsArray=[];
//         var totalItems=0;

//         var routeTimeArray=[];
//         var totalTime=0;
      
//         var routeFitness=0;
//         var fitness=0;  //HAY QUE CALCULAR LOS FITNESS

//         var customer;

//         var chromosome=indiv.getChromosome();


//         //var routeTime=getTime(-1,indiv.getChromosome().getAllele(0));//Cogemos Primer Cliente

 
//         //CAMINO HASTA SIGUIENTE Y LUEGO DESDE SIGUIENTE A ALMACÉN
        

//         //TANTOS CAMIONES COMO SEA NECESARIO POR LO QUE NO HACE FALTA PENALIZACIÓN !!!!¡¡¡¡!!!¡¡¡¡!!



//         customer = problem.customersArray[chromosome.getAllele(0)];

//         //console.log(JSON.stringify(chromosome))
//         //console.log(chromosome.getAllele(0))

//         var firstToDepot=getTime(chromosome.getAllele(0),-1,null); //Se pone 2 veces pq se sale y se llega al almacén
//         nextRoute(customer,0,chromosome,firstToDepot,firstToDepot,customer.getDeliveryItems());



//         function endRoute(cumulativeTime,cumulativeItems,timeToDepot){
//                 //FIN de ruta -> Sumamos camino hasta almacén y cerramos ruta.
//                 routeElementsArray.push(routeElements);
//                 routeElements=[];                

//                 cumulativeTime+=timeToDepot;
//                 routeTimeArray.push(cumulativeTime);
//                 routeItemsArray.push(cumulativeItems);
//                 totalTime+=cumulativeTime;
//                 totalItems+=cumulativeItems;

//         }


//         function nextRoute(customer, posCurrent, chromosome, cumulativeTime, timeToDepot, cumulativeItems){ //timeToDepot es del actual al almacén
//             //TODO -> Si no me paso del limite de size chromosme !!! posCurrent!!!

//                // console.log(JSON.stringify(chromosome))  
//               //  console.log("posCurrent="+posCurrent)      
//               //  console.log("CHROMOSOME.getSize()="+chromosome.getSize())
//             var allele=chromosome.getAllele(posCurrent);      
//             routeElements.push(allele+1);
//             if (posCurrent+1>=chromosome.getSize()){
//                 endRoute(cumulativeTime,cumulativeItems,timeToDepot);
//             }else {
//                 console.log("-----ELSE")
//                 var nextAllele=chromosome.getAllele(posCurrent+1);
//                 var nextTime = getTime(allele,nextAllele,customer);
//                 var nextTimeDepot = getTime(nextAllele,-1,null);
//                 console.log("-----ELSE_fin")

//                 var nextCustomer=problem.customersArray[nextAllele];
//                 var nextItems=nextCustomer.getDeliveryItems()
                
//                 if (((cumulativeTime+nextTime+nextTimeDepot)<problem.truckTime) && (cumulativeItems+nextItems)<problem.truckCapacity){//Si no supera límite se llama a siguiente
//                     //LIMITE DE CROMOSOMA ¿aquí o antes? cuando sea se cierra la ruta
//                     nextRoute(nextCustomer,posCurrent+1, chromosome, cumulativeTime+nextTime, nextTimeDepot,cumulativeItems+nextItems);
//                 } else { //Se ha sobrepasado ruta
//                     endRoute(cumulativeTime,cumulativeItems,timeToDepot);
//                     nextRoute(nextCustomer,posCurrent+1,chromosome,nextTimeDepot,nextTimeDepot,nextItems); //timeDepot es desde el siguiente al almacén.
//                 }
//             }
//         }


//         function getTime(ori,des,customer){ //Almacén es -1
//             // if (destiny!=-1){
//             //     customer = problem.customersArray[destiny];
//             // } 
//             ori++;
//             des++;
//             //console.log("ori="+ori)
//             //console.log("des="+des)
//             //console.log("matrixCost.length="+problem.matrixCost.length)
//             var t = problem.matrixCost[ori][des];
//             if (customer!=null){
//                 t +=customer.getDeliveryTime();     
//             }
//             return t;
//         }


// // function (tiempoacumulado, actual-almacen)
// //        actual-siguiente
// //        siguiente-depot
// //        <limite
// //        ->llamosiguiente

// //     ELSE
// //     cerramos ruta
// //         almacen-siguiente
// //         siguiente-almacen
// //         ¿chekeamos si no error?
// //         (acumulado,siguiente-almacen)


//             indiv.totalTime=totalTime;
//             indiv.totalItems=totalItems;
//             indiv.routeTimeArray=routeTimeArray;
//             indiv.routeItemsArray=routeItemsArray;
//             indiv.routeElementsArray=routeElementsArray;


//             //fitness=totalTime+(1000000*routeElementsArray.length)

//             fitness=totalTime*(-1);

//             //console.log("@@@@@ fitness="+fitness)
//             //fitness=fitness*(-1);

//             indiv.setFitness(fitness);
//     }





    evaluate2(indiv){
        var problem = this;

        var maxRoutes=10;

        var routeElementsArray=[];
        var routeElements=[];

        var routeItemsArray=[];
        var totalItems=0;

        var routeTimeArray=[];
        var totalTime=0;
      
        var routeFitness=0;
        var fitness=0;  //HAY QUE CALCULAR LOS FITNESS

        var customer;

        var chromosome=indiv.getChromosome();


        //var routeTime=getTime(-1,indiv.getChromosome().getAllele(0));//Cogemos Primer Cliente

 
        //CAMINO HASTA SIGUIENTE Y LUEGO DESDE SIGUIENTE A ALMACÉN
        

        //TANTOS CAMIONES COMO SEA NECESARIO POR LO QUE NO HACE FALTA PENALIZACIÓN !!!!¡¡¡¡!!!¡¡¡¡!!



        customer = problem.customersArray[chromosome.getAllele(0)];

        //console.log(JSON.stringify(chromosome))
        //console.log(chromosome.getAllele(0))

        var firstToDepot=getTime(chromosome.getAllele(0),-1); //Se pone 2 veces pq se sale y se llega al almacén
        nextRoute(customer,0,chromosome,firstToDepot,firstToDepot,customer.getDeliveryItems());



        function endRoute(cumulativeTime,cumulativeItems,timeToDepot){
                //FIN de ruta -> Sumamos camino hasta almacén y cerramos ruta.
                routeElementsArray.push(routeElements);
                routeElements=[];                

                cumulativeTime+=timeToDepot;
                routeTimeArray.push(cumulativeTime);
                routeItemsArray.push(cumulativeItems);
                totalTime+=cumulativeTime;
                totalItems+=cumulativeItems;

        }



        function lastRoute(cumulativeTime, cumulativeItems, posCurrent){
            //console.log("+<<<<<<<<<<<LAST ROUTE BEGIN")

            //console.log("cumulativeTimeBEGIN="+cumulativeTime);
            var arrayCumulativeTime=[];
            arrayCumulativeTime.push(cumulativeTime);

            var allele=chromosome.getAllele(posCurrent);
            customer=problem.customersArray[allele];
            routeElements.push(allele+1);

            while (posCurrent+1<chromosome.getSize()){ //Siguiente existe
                allele=chromosome.getAllele(posCurrent);
                routeElements.push(allele+1);
                //console.log("cumulativeTimeANTES="+cumulativeTime);
                cumulativeTime+=getTime(allele,chromosome.getAllele(posCurrent+1),null);
                cumulativeTime+=customer.getDeliveryTime();
                arrayCumulativeTime.push(cumulativeTime);
                //console.log("cumulativeTimeDESPUES="+cumulativeTime);
                cumulativeItems+=customer.getDeliveryItems();
                posCurrent++;
            }           

            indiv.arrayCumulativeTime=arrayCumulativeTime;
            allele=chromosome.getAllele(posCurrent);
            routeElements.push(allele+1);
            endRoute(cumulativeTime,cumulativeItems,getTime(allele,-1,null))

                        //console.log("cumulativeTimeEND="+cumulativeTime);
            //console.log("->>>>>>>>>>>>LAST ROUTE END")
        }

        function nextRoute(customer, posCurrent, chromosome, cumulativeTime, timeToDepot, cumulativeItems){ //timeToDepot es del actual al almacén
            //TODO -> Si no me paso del limite de size chromosme !!! posCurrent!!!

               // console.log(JSON.stringify(chromosome))  
              //  console.log("posCurrent="+posCurrent)      
              //  console.log("CHROMOSOME.getSize()="+chromosome.getSize())
            var allele=chromosome.getAllele(posCurrent);      
            routeElements.push(allele+1);
            if (posCurrent+1>=chromosome.getSize()){
                endRoute(cumulativeTime,cumulativeItems,timeToDepot);
            }else {
                console.log("-----ELSE")
                var nextAllele=chromosome.getAllele(posCurrent+1);
                var nextTime = getTime(allele,nextAllele,customer);
                var nextTimeDepot = getTime(nextAllele,-1,null);
                console.log("-----ELSE_fin")

                var nextCustomer=problem.customersArray[nextAllele];
                var nextItems=nextCustomer.getDeliveryItems()
                
                if (((cumulativeTime+nextTime+nextTimeDepot)<problem.truckTime) && (cumulativeItems+nextItems)<problem.truckCapacity){//Si no supera límite se llama a siguiente
                    //LIMITE DE CROMOSOMA ¿aquí o antes? cuando sea se cierra la ruta
                    nextRoute(nextCustomer,posCurrent+1, chromosome, cumulativeTime+nextTime, nextTimeDepot,cumulativeItems+nextItems);
                } else { //Se ha sobrepasado ruta
                    if (routeTimeArray.length+1>=maxRoutes){
                        lastRoute(cumulativeTime+nextTime, cumulativeItems+nextItems, posCurrent+1);
                    }else {
                        endRoute(cumulativeTime,cumulativeItems,timeToDepot);
                        nextRoute(nextCustomer,posCurrent+1,chromosome,nextTimeDepot,nextTimeDepot,nextItems); //timeDepot es desde el siguiente al almacén.
                    }
                }
            }
        }


        function getTime(ori,des,customer){ //Almacén es -1
            // if (destiny!=-1){
            //     customer = problem.customersArray[destiny];
            // } 
            ori++;
            des++;
            //console.log("ori="+ori)
            //console.log("des="+des)
            //console.log("matrixCost.length="+problem.matrixCost.length)
            var t = problem.matrixCost[ori][des];
            if (customer!=null){
                t +=customer.getDeliveryTime();     
            }
            return t;
        }


            indiv.totalTime=totalTime;
            indiv.totalItems=totalItems;
            indiv.routeTimeArray=routeTimeArray;
            indiv.routeItemsArray=routeItemsArray;
            indiv.routeElementsArray=routeElementsArray;


            //fitness=totalTime+(1000000*routeElementsArray.length)

            fitness=totalTime;
            
            var penalTime=0;
            var penalCap=0;
            if(routeTimeArray[routeTimeArray.length-1]>problem.truckTime){
                penalTime=problem.penalTime*(routeTimeArray[routeTimeArray.length-1]-problem.truckTime);
            }

            if(routeItemsArray[routeItemsArray.length-1]>problem.truckCapacity){
                penalCap=problem.penalCap*(routeItemsArray[routeItemsArray.length-1]-problem.truckCapacity);
            }
            fitness+=penalTime;

            fitness+=penalCap;

            fitness=fitness*(-1);

            //console.log("@@@@@ fitness="+fitness)
            //fitness=fitness*(-1);

            indiv.setFitness(fitness);
    }

 }



module.exports = ProblemCVRP;