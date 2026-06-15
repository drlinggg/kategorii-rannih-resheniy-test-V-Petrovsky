'use strict';

//массив с результатами по 19 группам вопросам
var res1 = [];

//массив с номерами 19 групп для сортировки
var res2 = [];

//группа универсальных переменных
var myElem, myElem2;
var myString;
var myCollection;
var myNumber;

//переменные обраотки результата группы
var NumberGroup = 1;
var StartNmumberInGroup = 0;
var EndNmumberInGroup = 0;
var GroupTotal= 0;

//переменная для вывода res2
var NumberOfBestInRes1 =1;

//главная функция
function MainCount(){
	//проверка на все ли вопросы был дан ответ
	ControlNumberOfCheked();
	//если не все вопросы (<174) помечены прерываем функцию
	if (myNumber<174){
		alert("вы ответили не на все вопросы");
		return;
	}
	//задем значения для расчета по 19 группам вопросов
	//передаем номер группы, начало группы, конец группы
	PrapareCountThisGroup(1,1,11);
	PrapareCountThisGroup(2,12,22);
	PrapareCountThisGroup(3,23,33);
	PrapareCountThisGroup(4,34,44);
	PrapareCountThisGroup(5,45,55);
	PrapareCountThisGroup(6,56,66);
	PrapareCountThisGroup(7,67,77);
	PrapareCountThisGroup(8,78,88);
	PrapareCountThisGroup(9,89,99);
	PrapareCountThisGroup(10,100,110);
	PrapareCountThisGroup(11,111,121);
	PrapareCountThisGroup(12,122,132);
	PrapareCountThisGroup(13,133,143);
	PrapareCountThisGroup(14,144,154);
	PrapareCountThisGroup(15,155,158);
	PrapareCountThisGroup(16,159,162);
	PrapareCountThisGroup(17,163,166);
	PrapareCountThisGroup(18,167,170);
	PrapareCountThisGroup(19,171,174);
	//вывод массива с первыми результатами
	FormingResult1();
	//обнуление массива с НОМЕРАМИ первых результатов
	res2 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
	//сортируем результаты по убыванию res1 и в зависимости от него res2
	SortingResult();
	//обнуляем данные result-2-1 - result-2-5, итоговая таблица
	ClearRes2Table();
	//вывод лучшей 5ки
	FormingResult2();
	ComeToResult();
}

//проверка на все ли вопросы был дан ответ
function ControlNumberOfCheked(){
	//обнуляем глобальную переменную myNumber
	myNumber = 0;
	myCollection = document.getElementsByTagName('input');
	for(var i=0; i<myCollection.length; i++){
		if (myCollection[i].checked){
			myNumber++;
		}
	}
}

//функция расчета конкретно взятой группы
function PrapareCountThisGroup(n,s,e){
	NumberGroup = n;
	StartNmumberInGroup = s;
	EndNmumberInGroup = e;
	//данные какая группа считается
	//какие именно впросы попадают в группу передаются в расчетный цикл
	CountThisGroup(StartNmumberInGroup, EndNmumberInGroup, NumberGroup );
}

//функция расчета конкретно взятой группы
function CountThisGroup(s, e, n){
	//обнуляем глобальную переменную сумма группы
	GroupTotal= 0;
	for (var i=s; i<e+1; i++){
		myString = "nameRadio"+i;
		myCollection = document.getElementsByName(myString);
		for(var ii=0; ii<2; ii++){
			if(myCollection[ii].checked){
				GroupTotal = GroupTotal + +myCollection[ii].value;
			}
		}
	}
	//добаляем в массив, согласно номеру расчитваемой группы
	res1[n] = +GroupTotal;
}

function FormingResult1(){
	for(var i=1; i<20;i++){
		myString = 'result-group-'+i;
		myElem = document.getElementById(myString);
		myElem.innerHTML = res1[i];
	}
}

//функция сравнения результатов если не равны меняем местами
function SortingResult(){
	for(var i=1;i<20;i++){
		for(var ii=1;ii<20;ii++){
			if(res1[ii]<res1[ii+1]){
				ChangingCell(ii);
			}
		}
	}
}

//функция замены в res1 и res2
function ChangingCell(x){
	myNumber = res1[x+1];
	res1[x+1] = res1[x];
	res1[x] = myNumber;
	myNumber = res2[x+1];
	res2[x+1] = res2[x];
	res2[x] = myNumber;
}

//обнуляем данные result-2-1 - result-2-5, итоговая таблица
function ClearRes2Table(){
	for(var i=1; i<6; i++){
		myElem = document.getElementById("result-2-"+i);
		myElem.innerHTML = '';
	}
}

//вывод лучшей 5ки
function FormingResult2(){
	NumberOfBestInRes1 =1;
	for(var i=1; i<6; i++){
		myElem = document.getElementById("result-2-"+i);
		//если есть нулевые результаты выходим 
		if(res1[NumberOfBestInRes1]==0){
			return;
		}
		if(myElem.innerHTML == ''){
			myString = '';
		}else{
			myString ='<br>';
		}
		myElem2 = document.getElementById("result-group-name-"+res2[NumberOfBestInRes1]);
		myElem.innerHTML = myElem.innerHTML + myString + myElem2.innerHTML + ', баллов - ' + res1[NumberOfBestInRes1] ;
		if(res1[NumberOfBestInRes1]==res1[NumberOfBestInRes1+1]){
			i--;
		}
		NumberOfBestInRes1++;
		if(NumberOfBestInRes1==20){
			return;
		}
	}
}
function ComeToResult(){
	window.location.hash="result-of-test";
	history.pushState('', document.title, window.location.pathname);
}