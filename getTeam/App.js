/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,  { Component } from 'react';
import type {Node} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Button, Alert, TextInput, Picker,FlatList,TouchableWithoutFeedback
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import CarouselCards from './CarouselCards'

class App extends Component {

state={
currentCarouselItemId:'',
openCompetitionForm:false,
developerSkills:[],
    statusChoise:false,
    loginEmail:'',
    loginPswd:'',
    userName:'',
    userData:'',
    userDescription:'',
    investorInvisibleValue:false,
    userInSearch: false,
    openUserInfoPage:false,
    infoForUserInfoPage:{  userId:1, userName:'Test User Name', userRole:'developer', aboutYou:'I am a cool developer', userSkills:['Javascript','Java']},
    userInfo:{newUser:true, userLogged:false, userId:'', userName:'', userRole:'', aboutYou:'', userSkills:{}}
}



pageOfUser(userId){
//тут поиск инфы о пользователе по апи. После получения инфы о пользователе записываем инфу в стэйт и открываем страницу показа пользователя
 this.setState({openUserInfoPage: true})
    console.log(userId)
}
    pressButtonHandle(newStatus){
    const userInfoObj = {newUser:true,userLogged:true, userId:'', userName:'', userRole:''}

        this.setState({statusChoise:newStatus, userInfo:userInfoObj, userInSearch:false, openUserInfoPage: false})
    }

    pressGoToSearchButton(){
    //тут пока просто смена стэйта что бы показать четвёртый экран, но будет отправляться запрос за данными в зависимости от статуса юзера, и отрисовываться соответствующий экран
        //userInSearch - обозначает намерение юзера перейти к просмотру четвертого экрана(на котором показаны другие юзеры)
        this.setState({userInSearch:true})
    }

    pressButtonSaveInfo(){
        //тут сохраняем инфу о пользователе.  В этом методе так же разбираемся какие данные отправлять , и деаем запрос на отправку данных на бэк

        //тут ещё надо учитывать, если юзер новый , то юзер айди будет пустой, если нет, то там будет значение, мы выясним когда на бэк отправим запрос после логина
        const userInfoObj = {newUser:false,userLogged:true, userId:'', userName:this.state.userName, userRole:this.state.statusChoise, aboutYou: this.state.userDescription}

        this.setState({userInfo: userInfoObj})
        //this.setState({userData:userData})
    }

    handleLoginSubmit(){
    //тут отправка запроса на бэк что бы залогинить
    //(тут упрощение , если юзера нет, то мы его регистрируем и позволяем идти дальше, если он есть то берем его данные )
    //также пока что для простоты считаем что все юзеры новые , когда добавлю бэк и допишу эту функцию , то там уже будет разделение
        if(this.state.loginEmail && this.state.loginPswd){
        const userInfoObj = {newUser:true,userLogged:true, userId:'', userName:'', userRole:''}

            this.setState({userInfo: userInfoObj})
        }

    }

 goToUserAccount(){
    this.setState({openUserInfoPage:false, userInSearch:false})
 }

get userInfoPage(){
return (
        <View>
                <Text>{this.state.infoForUserInfoPage.userRole}</Text>
                <Text>{this.state.infoForUserInfoPage.userName}</Text>
                <Text>{this.state.infoForUserInfoPage.aboutYou}</Text>
                <View style={{padding:20}}><Button title ='Go to accaunt' onPress={()=>{this.goToUserAccount()}}/></View>

        </View>
)

}

get listOfStartaps(){
    return (    <View style={{height:150}}>
      <FlatList
        data={[
          {title: 'Devin', id:1},
          {title: 'Dan',id:2},
          {title: 'Dominic',id:3},
          {title: 'Jackson',id:4},
          {title: 'James',id:5},
          {title: 'Joel',id:6},
          {title: 'John',id:7},
          {title: 'Jillian',id:8},
          {title: 'Jimmy',id:9},
          {title: 'Julie',id:10},
        ]}
        renderItem={({item}) =>

             <TouchableWithoutFeedback onPress={ () => this.pageOfUser(item.id)}>

                  <View>
                     <Text> {item.title} <Button title ='Like It' onPress={()=>{this.setLike(item.id)}}/></Text>
                  </View>

             </TouchableWithoutFeedback>

        }
      />
    </View>)
}

get thirdScreen(){
// в зависимости от выбора показывает соответствующий экран, это последний экран, показывается после заполнения профиля
        if (this.state.statusChoise=='developer'){
            return this.developerThirdScreen
        }
        if (this.state.statusChoise=='investor'){
            return this.investorThirdScreen
        }
        if (this.state.statusChoise=='startup'){
          return  this.startupThirdScreen
        }
}

currentCarouselItem=(currentItemId)=>{
// эта функция служит для того что бы прокидываться в карусель и давать оттуда айдишник
    this.setState({currentCarouselItemId:currentItemId})
    console.log('in app: '+currentItemId)
}

setLike(id){
if(id==null){
    console.log(this.state.currentCarouselItemId)
}else{
    console.log(id)
}
//ставим лайк. записываем что нам кто-то понравился(его айдишник)

}

get carousel(){
      return (
    <SafeAreaView >
      <CarouselCards currentCarouselItem={this.currentCarouselItem}/>
      <Button title ='Go back' onPress={()=>{this.pressButtonHandle(false)}}/>
      <View style={{padding:20}}><Button title ='Go to accaunt' onPress={()=>{this.goToUserAccount()}}/></View>
      <View style={{padding:20}}><Button title ='Like It' onPress={()=>{this.setLike()}}/></View>
    </SafeAreaView>
  );
}

get developerThirdScreen(){
//инфо с картинкой пользователя(у всех она пожалуй будет одна и та же ) и именем мы будем отображать сверху
//скилы чдевелопера тут я не буду отображать, это по приколу
// тут на самом деле будет карусель в которой будут отображаться CV компаний
// go back тут для удобства тестирования

    return ( this.state.openCompetitionForm ? this.competitionFormScreen : <View>
        <Text>{this.state.userInfo.userRole}</Text>
        <Text>{this.state.userInfo.userName}</Text>
        <Text>{this.state.userInfo.aboutYou}</Text>
        <View>
            {this.developerSkillsList}
        </View>
        <Button title ='Open competition form' onPress={()=>{this.setState({openCompetitionForm:true})}}/>
        <Button title ='Go to search' onPress={()=>{this.pressGoToSearchButton()}}/>
        <Button title ='Go back' onPress={()=>{this.pressButtonHandle(false)}}/>
    </View>)
}

get investorThirdScreen(){
//инфо с картинкой пользователя(у всех она пожалуй будет одна и та же ) и именем мы будем отображать сверху
// тут будет отображаться просто список который можно будет листать из компаний с кратким описанием и именем
    return (this.state.openCompetitionForm ? this.competitionFormScreen : <View>
        <Text>{this.state.userInfo.userRole}</Text>
        <Text>{this.state.userInfo.userName}</Text>
        <Text>{this.state.userInfo.aboutYou}</Text>
        <Button title ='Open competition form' onPress={()=>{this.setState({openCompetitionForm:true})}}/>
        <Button title ='Go to search' onPress={()=>{this.pressGoToSearchButton()}}/>
        <Button title ='Go back' onPress={()=>{this.pressButtonHandle(false)}}/>
    </View>)
}

get startupThirdScreen(){
//инфо с картинкой пользователя(у всех она пожалуй будет одна и та же ) и именем мы будем отображать сверху
// тут будет отображаться слайдер, элементами в котором будут CV девелоперов и инвесторов у которых нет подтверждения во флаге невидимости
        return (this.state.openCompetitionForm ? this.competitionFormScreen : <View>
        <Text>{this.state.userInfo.userRole}</Text>
        <Text>{this.state.userInfo.userName}</Text>
        <Text>{this.state.userInfo.aboutYou}</Text>
        <View>
            {this.developerSkillsList}
        </View>
        <Button title ='Open competition form' onPress={()=>{this.setState({openCompetitionForm:true})}}/>
        <Button title ='Go to search' onPress={()=>{this.pressGoToSearchButton()}}/>
        <Button title ='Go back' onPress={()=>{this.pressButtonHandle(false)}}/>
    </View>)
}

 get secondScreen(){
 // отрисовывает нужный экран в зависимости от выбора статуса
        if (this.state.statusChoise=='developer'){
            return this.developerScreen
        }
        if (this.state.statusChoise=='investor'){
            return this.investorScreen
        }
        if (this.state.statusChoise=='startup'){
          return  this.startupScreen
        }
 }

setSelectedValuePickerDeveloper(itemValue,itemIndex){
//эта функция добавляет выбранный скилл в массив умений девелопера
    let chose = this.state.developerSkills
    chose.push(itemValue)
    this.setState({developerSkills: chose})
}

handleDeleteSkill(choseName){
//Эта функция удаляет скил из массива выбранных скилов
    let chooses = this.state.developerSkills
    chooses.splice(chooses.indexOf(choseName), 1);
    this.setState({developerSkills:chooses})
}

get developerSkillsList(){
// отрисовывает скилы девелопера
let result = []
    for(const chose in this.state.developerSkills){
       result.push( <Text key={chose}>Your chose: {this.state.developerSkills[chose]} </Text>)
    }
   return result
}

get developerSkillsChoise(){
//отрисовывает скилы девелопера с возможностью их удаления
let result = []
    for(const chose in this.state.developerSkills){
        let currentSkillName = this.state.developerSkills[chose]
       result.push(
                   <Text key={chose}>Your choise: {this.state.developerSkills[chose]}
                     <Button title ='x' onPress={()=>{this.handleDeleteSkill(currentSkillName)}}/>
                   </Text>
                  )
    }
   return result
}

 get developerScreen(){
//это страница профиля девелопера
    return (

                            <View>
                <Text>Developer</Text>
                <TextInput placeholder="Enter Your name" onChangeText={(text)=>{this.setState({userName:text})}}/>
                <TextInput maxLength={40} placeholder="Enter about you " onChangeText={(text)=>{this.setState({userDescription:text})}}/>
                <View>
                  <Picker
                    selectedValue={this.state.developerSkills}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setSelectedValuePickerDeveloper(itemValue,itemIndex)}
                  >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
                {this.developerSkillsChoise}


                <Button title ='Save info' onPress={()=>{this.pressButtonSaveInfo()}}/>
                <Button title ='Go back' onPress={()=>{this.pressButtonHandle(false)}}/>
            </View>


            )
 }

investorCheckInvisible(){
//устанавливает опцию видимости для инвестора, от этой опции зависит будет ли видно инвестора  в выборке
    let newInvisibleValue = this.state.investorInvisibleValue
    this.setState({investorInvisibleValue: !newInvisibleValue})
}

 get investorScreen(){
 // экран заполнения свойств профиля инвестора хочу сюда чекбокс прихерачить, но ебаный реакт выёбывается как может
 //                 <View>
////                 <CheckBox
////                  value={this.state.investorInvisibleValue}
////                  onValueChange={()=>this.investorCheckInvisible()}
////                />
////                <Text >Do you wanna be invisible in search for startaps?</Text>
//            </View>
    return (
            <View>
                <Text>Investor</Text>
                <TextInput placeholder="Enter Your name" onChangeText={(text)=>{this.setState({userName:text})}}/>
                <TextInput maxLength={40} placeholder="Enter about you " onChangeText={(text)=>{this.setState({userDescription:text})}}/>

                <Button title ='Save info' onPress={()=>{this.pressButtonSaveInfo()}}/>
                <Button title ='Go back' onPress={()=>{this.pressButtonHandle(false)}}/>
            </View>
            )
 }
get competitionFormScreen(){
    return (
            <View>
                        <Text> this is competition form screen</Text>


                <Button title ='Go back' onPress={()=>{this.setState({openCompetitionForm:false})}}/>
                </View>
    )
}

 get startupScreen(){
 // экран хаполнения профиля стартап проекта
    return (
            <View>
                <TextInput placeholder="Enter Your name" onChangeText={(text)=>{this.setState({userName:text})}}/>
                <TextInput maxLength={40} placeholder="Enter about you " onChangeText={(text)=>{this.setState({userDescription:text})}}/>
                               <View>
                  <Picker
                    selectedValue={this.state.developerSkills}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setSelectedValuePickerDeveloper(itemValue,itemIndex)}
                  >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
                {this.developerSkillsChoise}
                   <Button title ='Save info' onPress={()=>{this.pressButtonSaveInfo()}}/>
                <Button title ='Go back' onPress={()=>{this.pressButtonHandle(false)}}/>
            </View>
           )
 }

get loginScreen(){
// экран логина
    return (
       <View>
        <TextInput placeholder="Enter Email" onChangeText={(text)=>{this.setState({loginEmail:text})}}/>
        <TextInput
        onChangeText={(text)=>{this.setState({loginPswd:text})}}
          secureTextEntry={true}
          placeholder="Enter Password"
        />
        <Button title = 'Login' onPress = {()=>{this.handleLoginSubmit()}}/>
      </View>

    )

}
get fourthScreen(){
// тут в зависимости от статцуса будет отображаться соотвестветстввующий экран, карусели с результатами поиска для девелоперов и стартапов и список компаний в столбик для инвесторов
        if (this.state.statusChoise=='developer'){
            return this.developerFourthScreen
        }
        if (this.state.statusChoise=='investor'){
            return this.investorFourthScreen
        }
        if (this.state.statusChoise=='startup'){
          return  this.startupFourthScreen
        }

}

get developerFourthScreen(){
    return (
    <View>
        <View><Text>Developer</Text></View>
        {this.carousel}
        <View style={{padding:20}}><Button title ='Go to accaunt' onPress={()=>{this.goToUserAccount()}}/></View>
        <Button title ='Go back' onPress={()=>{this.pressButtonHandle(false)}}/>
    </View>);
}

get investorFourthScreen(){
    return (
    <View>
        <View>
            {this.listOfStartaps}
        </View>
        <View>
            <Text>Investor</Text>

            <View style={{padding:20}}><Button title ='Go to accaunt' onPress={()=>{this.goToUserAccount()}}/></View>
            <Button title ='Go back' onPress={()=>{this.pressButtonHandle(false)}}/>
        </View>
    </View>
    )
}

get startupFourthScreen(){
    return (
    <View>
        <View><Text>Startup</Text></View>
        <View>{this.carousel}</View>


    </View>)
}

get whatScreenMustBeSeen(){
if(!this.state.userInfo.userLogged && this.state.userInfo.newUser && !this.state.statusChoise && !this.state.userInSearch && !this.state.openUserInfoPage){
    return this.loginScreen
}
if(this.state.userInfo.newUser && !this.state.statusChoise && !this.state.userInSearch && !this.state.openUserInfoPage){
    return this.firstScreen
}
if(this.state.statusChoise && !this.state.userInSearch && !this.state.openUserInfoPage && !this.state.userInfo.newUser ){
    return this.secondScreen
}
if(this.state.userInSearch && !this.state.openUserInfoPage){
   return this.fourthScreen
}
if(this.state.openUserInfoPage){
 return this.userInfoPage
}
    //{this.state.userInfo.userLogged ? !this.state.userInfo.newUser? this.state.userInSearch ? this.fourthScreen : this.thirdScreen:(this.state.statusChoise==false ? this.firstScreen : this.secondScreen): this.loginScreen}
}

get firstScreen(){
// экран выбора статуса , кем юзер хочет быть
    return (
            <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
                <Button title ='Investor' onPress={()=>{this.pressButtonHandle('investor')}}/>
                <Button title ='Startup' onPress={()=>{this.pressButtonHandle('startup')}}/>
                <Button title ='Developer' onPress={()=>{this.pressButtonHandle('developer')}}/>
            </View>
            )

}
    render(){
        return (
                <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
                    {this.state.userInfo.userLogged ? !this.state.userInfo.newUser? this.state.userInSearch ? this.state.openUserInfoPage ? this.userInfoPage : this.fourthScreen : this.thirdScreen:(this.state.statusChoise==false ? this.firstScreen : this.secondScreen): this.loginScreen}
                </View>
                );
    }
}

export default App;
