/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,  { Component } from 'react';
import type {Node} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Button, Alert, TextInput, Picker,FlatList,TouchableWithoutFeedback,TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import data from './data'
import CarouselCards from './CarouselCards'

class App extends Component {

// thisUserCanSeeChannels <-- говорит что юзеру можно показывать подобранные каналы
// currentCarouselItemId <-- текущий элеиент карусели
// openCompetitionForm <-- открывает форму соревнования(хакатона) на которой юзер загружает инфу о своем проекте
// developerSkills <-- умения текущего юзера которые он выбрал для своего профиля( что ищем )
// statusChoise <-- выбор кто будет юзер (стартап , девелопер или спонсор)
// loginEmail < -- емэйл который при логине указал
// loginPswd <--  пароль который при логине указал
// userName <-- имя которое вводит при заполнении формы о себе
//userData
// userDescription <-- описание которое юзер желает оставить о себе
// userInSearch <-- юзер перешёл к поиску (сотрудников, стартапов, девелоперов)
//
state={
carouselData:[],
userId:'',
skillsForProject:[],
    requirementSkillsOfProject:[],
    thisUserCanSeeChannels:true,
    currentCarouselItemId:'',
    openCompetitionForm:false,
    developerSkills:[],
   statusChoise:false,

    professionalSize:'',
    openLoginScreen:false,
    userLogged:false,
    aboutUser:'',
    openSignUpScreen:false,
    userName:'',
    firstName:'',
    lastName:'',
    theNameOfUserLocation:'',
    professionalInterest: 'cinema',
    openMessagesForm:false,
    createLetter:false,
    textLetter:'',
    forWhoThisLetter:'',
    openNotificationsList:false,
    competitionProjectName:'',
    competitionProjectDescription:'',
    thisUserCanSeeChannels:true,
    currentCarouselItemId:'',
    openCompetitionForm:false,
    developerSkills:[],
    newUser:true,

    statusChoise:"developer",
    loginEmail:'',
    loginPswd:'',
    userName:'',
    userData:'',
    userDescription:'',
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
        this.setState({statusChoise:newStatus, userInfo:userInfoObj, userInSearch:false, openUserInfoPage: false, userLogged:true,newUser:true})
    }

    pressGoToSearchButton(){
    //тут пока просто смена стэйта что бы показать четвёртый экран, но будет отправляться запрос за данными в зависимости от статуса юзера, и отрисовываться соответствующий экран
        //userInSearch - обозначает намерение юзера перейти к просмотру четвертого экрана(на котором показаны другие юзеры)
        //тут обращение к api за данными
        this.setMatchingData()
        this.setState({userInSearch:true, carouselData: data})
    }

    pressButtonSaveInfo(){
        //тут сохраняем инфу о пользователе.  В этом методе так же разбираемся какие данные отправлять , и деаем запрос на отправку данных на бэк
        //тут ещё надо учитывать, если юзер новый , то юзер айди будет пустой, если нет, то там будет значение, мы выясним когда на бэк отправим запрос после логина
        this.handleUpdateUser()
        const userInfoObj = {
                                newUser:false,userLogged:true, userId:'',
                                userName:this.state.userName, userRole:this.state.statusChoise,
                                aboutYou: this.state.userDescription
                            }
        this.setState({userInfo: userInfoObj,userLogged:true, newUser:false})
        //this.setState({userData:userData})
    }

    handleLoginSubmit(){
    //тут отправка запроса на бэк что бы залогинить
    //(тут упрощение , если юзера нет, то мы его регистрируем и позволяем идти дальше, если он есть то берем его данные )
    //также пока что для простоты считаем что все юзеры новые , когда добавлю бэк и допишу эту функцию , то там уже будет разделение
        if(this.state.loginEmail && this.state.loginPswd){
            const userInfoObj = {newUser:true,userLogged:true, userId:'', userName:'', userRole:''}
            this.setState({userInfo: userInfoObj,userLogged:true,newUser:true, userLogged:true})
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
          <CarouselCards carouselData={this.state.carouselData} currentCarouselItem={this.currentCarouselItem}/>
          <Button title ='Go back' onPress={()=>{this.pressButtonHandle(false)}}/>
          <View style={{padding:20}}><Button title ='Go to accaunt' onPress={()=>{this.goToUserAccount()}}/></View>
          <View style={{padding:20}}><Button title ='Like It' onPress={()=>{this.setLike()}}/></View>
        </SafeAreaView>
      );
    }

    get notificationsListForm(){
        return(
            <View>
                <Text> Notifications  list must be here here </Text>
                <Button title ='Go back to account' onPress={()=>{this.setState({openUserInfoPage:false, userInSearch:false, openNotificationsList:false})}}/>
            </View>
        )
    }

    get messagesListForm(){
        return(
            !this.state.createLetter ?
            <View>
                <Text> Messages  list must be here here </Text>
                <Button title ='Wanna create message? ' onPress={()=>{this.setState({createLetter:true})}}/>
                <Button title ='Go back to account' onPress={()=>{this.setState({openUserInfoPage:false, userInSearch:false, openNotificationsList:false, createLetter:false, openMessagesForm:false})}}/>
            </View> :
            <View>
                <Text> Create message here </Text>
                <TextInput placeholder="Enter text message here" onChangeText={(text)=>{this.setState({textLetter:text})}}/>
                 <View style={{height:150}}>
                      <FlatList
                        data={[
                          {title: 'Devin', id:1},
                          {title: 'Dan',id:2},
                        ]}
                        renderItem={({item}) =>
                        <TouchableWithoutFeedback onPress={ () => this.pageOfUser(item.id)}>
                              <View>
                                 <Text> {item.title} <Button title ='Select this user' onPress={()=>{this.setState({forWhoThisLetter:item.id})}}/></Text>
                              </View>
                        </TouchableWithoutFeedback>
                        }
                      />
                 </View>

                <Button title ='Send Message' onPress={()=>{console.log('message was send')}}/>
                <Button title ='Go back to message list' onPress={()=>{this.setState({openUserInfoPage:false, userInSearch:false, openNotificationsList:false, createLetter:false})}}/>
                <Button title ='Go back to account' onPress={()=>{this.setState({openUserInfoPage:false, userInSearch:false, openNotificationsList:false, createLetter:false, openMessagesForm:false})}}/>
            </View>

        )
    }
get userName(){
    return (
        this.state.userName ? <Text>Username: {this.state.userName}</Text>:null
    )
}
get firstName(){
    return (this.state.firstName ? <Text >First name: {this.state.firstName}</Text>:null)
}
get lastName(){
    return (this.state.lastName ? <Text>Last Name:{ this.state.lastName}</Text>:null)
}
get aboutUser(){
    return ( this.state.aboutUser ? <Text>About user: {this.state.aboutUser}</Text>:null)
}
get chosenSkillsList(){
    return (this.state.developerSkills.length>0 ? <View>
                         <Text>Chosen skills list: </Text>
                        {this.developerSkillsList}
                    </View>:null)
}

    get thirdScreen(){
    //инфо с картинкой пользователя(у всех она пожалуй будет одна и та же ) и именем мы будем отображать сверху
    // тут будет отображаться слайдер, элементами в котором будут CV девелоперов и инвесторов у которых нет подтверждения во флаге невидимости
            return (
                this.state.openCompetitionForm ? this.competitionFormScreen :
                this.state.openNotificationsList ? this.notificationsListForm :
                this.state.openMessagesForm ? this.messagesListForm:
                <View style={{top:0, marginTop:0, backgroundColor:'white'}}>
                    {this.userName}
                    {this.firstName}
                    {this.lastName}
                    <View>
                       { this.aboutUser}
                    </View>

                    {this.chosenSkillsList}
                    <View style={{paddingTop: 50}}>
                        <Button title ='Create idea' onPress={()=>{this.setState({openCompetitionForm:true})}}/>
                        <Button title ='Go to search' onPress={()=>{this.pressGoToSearchButton()}}/>
                        <Button title ='Update Profile' onPress={()=>{this.pressButtonHandle(false)}}/>
                        <Button title ='Your Notifications (2)' onPress={()=>{this.setState({openNotificationsList:true})}}/>
                        <Button title ='Your messages list (1)' onPress={()=>{this.setState({openMessagesForm:true})}}/>
                    </View>
                </View>)
    }



    setSelectedValuePickerDeveloper(itemValue,itemIndex){
    //эта функция добавляет выбранный скилл в массив умений девелопера
        let chose = this.state.developerSkills
        chose.push(itemValue)
        this.setState({developerSkills: chose})
    }

    sendIdeaForCompetitionAnonSedByPlatform(){
        this.handleCreateProject()
        this.setState({openUserInfoPage:false, userInSearch:false, openCompetitionForm:false})
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
            result.push( <Text key={chose}> {this.state.developerSkills[chose]} </Text>)
        }
        return result
    }

    get developerSkillsChoise(){
        //отрисовывает скилы девелопера с возможностью их удаления
        let result = []
            for(const chose in this.state.developerSkills){
                let currentSkillName = this.state.developerSkills[chose]
               result.push(
                           <Text key={chose}>{this.state.developerSkills[chose]}
                             <Button title ='x' onPress={()=>{this.handleDeleteSkill(currentSkillName)}}/>
                           </Text>
                          )
            }
        return result
    }

    handleDeleteRequirementSkill(currentSkillName){
        let chooses = this.state.developerSkills
        chooses.splice(chooses.indexOf(choseName), 1);
        this.setState({developerSkills:chooses})
    }
        get requirementsSkillsForProject(){
        //отрисовывает скилы девелопера с возможностью их удаления
        let result = []
            for(const chose in this.state.requirementSkillsOfProject){
                let currentSkillName = this.state.requirementSkillsOfProject[chose]
               result.push(
                           <Text key={chose}>{this.state.requirementSkillsOfProject[chose]}
                             <Button title ='x' onPress={()=>{this.handleDeleteRequirementSkill(currentSkillName)}}/>
                           </Text>
                          )
            }
        return result
    }

    setProfessionalSize(itemValue){
        this.setState({professionalSize:itemValue})
    }

    get profileMenu(){

    //это страница профиля девелопера
        return (
                <View style={{ backgroundColor:'white', top:0 , left:0}}>
                    <Text >{this.state.userId} {this.state.statusChoise=='specialist'? 'Specialist':'Team'}</Text>
                    <View>
                          <Text>You are a: </Text>
                          <Picker
                            selectedValue={this.state.professionalSize}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => this.setProfessionalSize(itemValue,itemIndex)}
                          >
                            <Picker.Item label="Individual" value="Individual" />
                            <Picker.Item label="Collective" value="Collective" />
                            <Picker.Item label="Organisation" value="Organisation" />
                          </Picker>
                    </View>

                    <View>
                        {this.chooseSkills}
                    </View>
                    {this.developerSkillsChoise}
                    <View>
                        <Text> Write your country/location: </Text>

                        <Picker
                            selectedValue={this.state.theNameOfUserLocation}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({theNameOfUserLocation:itemValue})}
                        >
                            <Picker.Item label="Georgia" value="Georgia" />
                            <Picker.Item label="Belarus" value="Belarus" />
                            <Picker.Item label="Lithuania" value="Lithuania" />
                        </Picker>

                    </View>
                    <View>
                    <Text>Tell us about yourself </Text>
                        <TextInput maxLength={40} placeholder="About you.. " onChangeText={(text)=>{this.setState({aboutUser:text})}}/>
                    </View>

                    <Button title ='Save info' onPress={()=>{this.pressButtonSaveInfo()}}/>
                    <Button title ='Go back' onPress={()=>{this.goToStart()}}/>
                </View>


                )
     }

    goToStart(){
        this.setState({userLogged:false, openLoginScreen:false})
    }

    setRequirementSkillsOfProject(itemValue,itemIndex){
    //эта функция добавляет выбранный скилл в массив умений девелопера
    console.log(itemValue)
        let chose = this.state.requirementSkillsOfProject
        chose.push(itemValue)
        this.setState({requirementSkillsOfProject: chose})
    }

    get competitionFormScreen(){
    //тут надо добавить возможность описания проекта, его названия, возможно добавления ссылок на файлы проекта(какие пользователи захотят, презентации там , всё такое )
        return (
                <View style={{backgroundColor:'white',top:0}}>
                    <TextInput placeholder="Enter Name of your project" onChangeText={(text)=>{this.setState({competitionProjectName:text})}}/>
                    <TextInput maxLength={40} placeholder="Enter about your project " onChangeText={(text)=>{this.setState({competitionProjectDescription:text})}}/>

                    <View>
                        {this.chooseSkillsForProject}
                    </View>
                        {this.requirementsSkillsForProject}
                    <View>


                    </View>

                    <Button title ='Go back' onPress={()=>{this.setState({openCompetitionForm:false})}}/>
                    <Button title ='Send your idea' onPress={()=>{this.sendIdeaForCompetitionAnonSedByPlatform()}}/>
                </View>
        )
    }

    get chooseCinemaSkills(){
        return(
                <View>
                    <Text>Indicate the skills:</Text>
                    <Picker
                        selectedValue={this.state.developerSkills}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => this.setSelectedValuePickerDeveloper(itemValue,itemIndex)}
                    >
                        <Picker.Item label="single-camera setup" value="single-camera setup" />
                        <Picker.Item label="multiple-camera setup" value="multiple-camera setup" />
                    </Picker>
                </View>
        )
    }

    get chooseTheatreSkills(){
        return(
            <View>
                <Text>Indicate the skills:</Text>
                <Picker
                    selectedValue={this.state.developerSkills}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setSelectedValuePickerDeveloper(itemValue,itemIndex)}
                >
                     <Picker.Item label="Dansing" value="dansing" />
                     <Picker.Item label="Singing" value="singing" />
                </Picker>
            </View>
        )
    }

    setProfessionalInterest(itemValue,itemIndex){
        this.setState({professionalInterest:itemValue})
    }

    get chooseSkills(){
            return this.chooseTheatreSkills
    }


    get chooseSkillsForProject(){
            return this.chooseTheatreSkillsForProject
    }

    get chooseTheatreSkillsForProject(){
                return(
            <View>
                <Text>Indicate the skills:</Text>
                <Picker
                    selectedValue={this.state.requirementSkillsOfProject}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setSelectedValuePickerSkillsForProject(itemValue,itemIndex)}
                >
                     <Picker.Item label="Dansing" value="dansing" />
                     <Picker.Item label="Singing" value="singing" />
                </Picker>
            </View>
        )
    }

        setSelectedValuePickerSkillsForProject(itemValue,itemIndex){
    //эта функция добавляет выбранный скилл в массив умений девелопера
        let chose = this.state.requirementSkillsOfProject

        chose.push(itemValue)
        this.setState({requirementSkillsOfProject: chose})
    }


    get registeredOrLogged(){
        return (
            (!this.state.openLoginScreen && !this.state.openSignUpScreen) ?
            <View >
                <Text style={{fontSize: 35, color:'white'}}>Hi there!</Text>
                <Text style={{fontSize: 35, color:'white'}}>Working in performing arts?</Text>
                <Text style={{fontSize: 18, color:'white'}}>Welkome to the long awaited industry network</Text>
                <View style={{marginTop:50}}>
                <Button style={{backgroundColor: 'red' , color:'white ' }} title = 'Login' onPress = {()=>{this.setState({openSignUpScreen:false, openLoginScreen:true})}}/>
                </View>
                <View style={{marginTop:20}}>
                <Button style={{paddingTop:15  }} title = 'SignUp' onPress = {()=>{this.setState({openSignUpScreen:true, openLoginScreen:false})}}/>
                </View>
            </View> : this.loginOrSignUpScreen
        )
    }

    setMatchingData(){
              fetch('https://67d89896745c.ngrok.io/get_match', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: this.state.userId,

          })
      }).then(function (response) { return response.json(); }).then((data) =>{

      console.log('user data: '+data[0].test)
//      this.setState({
//        carouselData:false,userLogged:true,newUser:false,
//        userName: userData.username, loginEmail: userData.email,
//        firstName:userData.firstname, lastName:userData.lastname,
//        aboutYou:userData.about_user, developerSkills: ['Dansing']
//
//      })
      }).catch(err => {
        console.log('ERROR here: ', err);
      });
    }


    handleLoginSubmit(){
        // тут отправка на бэк данных регистрации
        console.log('here')
      fetch('https://67d89896745c.ngrok.io/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            password: this.state.loginPswd,
            loginEmail: this.state.loginEmail
          })
      }).then(function (response) { return response.json(); }).then((data) =>{
        const userData = JSON.parse(data)
      console.log('user data: '+JSON.parse(data).id)
      this.setState({
        openSignUpScreen:false,userLogged:true,newUser:false,
        userName: userData.username, loginEmail: userData.email,
        firstName:userData.firstname, lastName:userData.lastname,
        aboutYou:userData.about_user, developerSkills: ['Dansing'], userId: userData.id

      })
      }).catch(err => {
        console.log('ERROR here: ', err);
      });
      //засэтить данные нормально , после сохранения

//        let userInfo = {newUser:true, userLogged:true, userId:'', userName:'', userRole:'', aboutYou:'', userSkills:{}}
//        this.setState({userInfo:userInfo, openSignUpScreen:false,userLogged:true,newUser:true})
    }

    handleRegisterSubmit(){
    let userId =''
        // тут отправка на бэк данных регистрации
      fetch('https://67d89896745c.ngrok.io/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          userName: this.state.userName ,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.loginPswd,
            loginEmail: this.state.loginEmail,
            userId: this.state.userId
          })
      }).then(function (response) { return response.json(); }).then((data) =>{
        console.log(data.userId)
        this.setState({userId:data.userId,openSignUpScreen:false,userLogged:true,newUser:false})

      }).catch(err => {

        console.log('ERROR here: ', err);
      });

    }

    handleUpdateUser(){
    let userId =''
        // тут отправка на бэк данных регистрации
      fetch('https://67d89896745c.ngrok.io/update_user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          aboutUser: this.state.aboutUser ,
            user_status: this.state.statusChoise,

            country: this.state.theNameOfUserLocation,
            userSkills: this.state.developerSkills,
            userId: this.state.userId
          })
      }).then(function (response) { return response.json(); }).then((data) =>{
        console.log(data.userId)


      }).catch(err => {

        console.log('ERROR here: ', err);
      });

    }


    handleCreateProject(){
    let userId =''
        // тут отправка на бэк данных регистрации
      fetch('https://67d89896745c.ngrok.io/create_project', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.state.competitionProjectName,
            description: this.state.competitionProjectDescription,
            need_skills: this.state.requirementSkillsOfProject,
            who_create: this.state.userId
          })
      }).then(function (response) { return response.json(); }).then((data) =>{
        console.log(data)


      }).catch(err => {

        console.log('ERROR here: ', err);
      });

    }


    get signUpScreen(){
        return (
            <View style={{backgroundColor:'white'}}>
                <TextInput onChangeText={(text)=>{this.setState({userName:text})}} placeholder="Username" />
                <TextInput onChangeText={(text)=>{this.setState({firstName:text})}} placeholder="FirstName"/>
                <TextInput onChangeText={(text)=>{this.setState({lastName:text})}} placeholder="LastName"/>
                <TextInput placeholder="Enter Email" onChangeText={(text)=>{this.setState({loginEmail:text})}}/>
                <TextInput onChangeText={(text)=>{this.setState({loginPswd:text})}} secureTextEntry={true} placeholder="Enter Password"/>
                <Button title = 'Submit' onPress = {()=>{this.handleRegisterSubmit()}}/>
            </View>
        )
    }

    get loginOrSignUpScreen(){
        if(this.state.openSignUpScreen && !this.state.openLoginScreen){
            return this.signUpScreen
        }
        if(!this.state.openSignUpScreen && this.state.openLoginScreen){
            return this.loginScreen
        }
    }

    get loginScreen(){
    // экран логина
        return (
           <View style={{backgroundColor: 'white' , height:400, width:320, }}>
           <View style={{marginTop:100}}>
            <TextInput placeholder="Email" onChangeText={(text)=>{this.setState({loginEmail:text})}}/>
            <TextInput
            onChangeText={(text)=>{this.setState({loginPswd:text})}}
              secureTextEntry={true}
              placeholder="Enter Password"
            />
            </View>
            <View style={{paddingTop: 150, width:200}}>
                <Button style={{backgroundColor: 'white'}} title = 'Login' onPress = {()=>{this.handleLoginSubmit()}}/>
            </View>
          </View>

        )

    }

    get fourthScreen(){
    // тут в зависимости от статцуса будет отображаться соотвестветстввующий экран, карусели с результатами поиска для девелоперов и стартапов и список компаний в столбик для инвесторов
        return this.developerFourthScreen
    }

    get developerFourthScreen(){
        return (
        <View>
            {this.carousel}
            <View style={{padding:20}}><Button title ='Go to accaunt' onPress={()=>{this.goToUserAccount()}}/></View>
            <Button title ='Go back' onPress={()=>{this.pressButtonHandle(false)}}/>
        </View>);
    }

    get createUpdateScreen(){
    // экран выбора статуса , кем юзер хочет быть
        return (
                <View style={{flex:1,alignItems: 'center', justifyContent: 'center',backgroundColor:'white', width:600}}>
                    <TouchableOpacity onPress={()=>{this.setState({statusChoise:'team'})}}><View><Text>Team</Text></View></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.setState({statusChoise:'specialist'})}}><View><Text>Artist</Text></View></TouchableOpacity>
                     {this.profileMenu}
                </View>
                )
    }

    render(){
        return (
                <View style={{ flex:1,top:0,alignItems: 'center', backgroundColor: 'black', justifyContent: 'center', marginTop:0}}>
                    {
                        this.state.userLogged ? !this.state.newUser
                                                           ? this.state.userInSearch
                                                           ? this.state.openUserInfoPage
                                                           ? this.userInfoPage
                                                           : this.fourthScreen
                                                           : this.thirdScreen
                                                           : ( this.createUpdateScreen )
                                                           : this.registeredOrLogged
                    }
                </View>
                );
    }
}

export default App;
