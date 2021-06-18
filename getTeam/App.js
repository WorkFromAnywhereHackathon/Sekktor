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
forWhoThisLetterName:'',
carouselData:[],
userId:'',
listUsersToWhoCanWriteMessage:[],
skillsForProject:[],
listMessages:[],
    requirementSkillsOfProject:'',
    thisUserCanSeeChannels:true,
    currentCarouselItemId:'',
    openCompetitionForm:false,
    developerSkills:'',
   statusChoise:false,
    notificationItems:[],
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
        this.setMatchingData()
        this.setState({userInSearch:true, carouselData: data})
    }

    pressButtonSaveInfo(){
        this.handleUpdateUser()
        const userInfoObj = {
                                newUser:false,userLogged:true, userId:'',
                                userName:this.state.userName, userRole:this.state.statusChoise,
                                aboutYou: this.state.userDescription
                            }
        this.setState({userInfo: userInfoObj,userLogged:true, newUser:false})

    }

    handleLoginSubmit(){
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
        this.setState({currentCarouselItemId:currentItemId.id})
    }


    setLike(){
        this.setLikeToBackend()
    }

    get carousel(){
          return (

                <SafeAreaView >
                  <CarouselCards carouselData={this.state.carouselData} currentCarouselItem={this.currentCarouselItem}/>

                  <View style={{marginTop:20}}><Button color='grey' title ='Go to accaunt' onPress={()=>{this.goToUserAccount()}}/></View>
                  <View style={{marginTop:20}}><Button color='grey' title ='Like It' onPress={()=>{this.setLike()}}/></View>
                </SafeAreaView>

          );
    }

    get notifications(){
    let result = []
    let i = 0
         for(const item in this.state.notificationItems){
            result.push(<Text style={{fontSize:14 , borderColor:'grey', borderWidth:2, marginBottom:15}} key={i}>User {this.state.notificationItems[item].username_who_like} is interested in your project {this.state.notificationItems[item].idea_name} </Text> )
             i++
         }
        return result
    }

    get notificationsListForm(){
        return(
            <View style={{backgroundColor:'white', height:500, width: 400, alignItems:'center', borderRadius: 25}}>
                <View style={{height: 350, marginTop:40}}>
                    {this.notifications}
                </View>
                <View style={{ width: 250 }}><Button color='grey' title ='Go back to account' onPress={()=>{this.backToAckFromNotify()}}/></View>
            </View>
        )
    }

    backToAckFromNotify(){
        this.setState({openUserInfoPage:false, userInSearch:false,openNotificationsList:false})
    }

    getTargetUsersForMessages(){
        this.getTargetUsers()
        this.setState({createLetter:true})
    }

    get userSelectForSendMessage(){
        return(
                 <View style={{backgroundColor:'white',height:150}}>
                 <View style = {{marginBottom: 10, marginTop:40}}><Text> Current choosen user: {this.state.forWhoThisLetterName}</Text></View>
                      <FlatList
                        data={this.state.listUsersToWhoCanWriteMessage}
                        renderItem={({item}) =>
                        <TouchableWithoutFeedback  onPress={ () => this.pageOfUser(item.user_id_who_like)}>
                              <View style={{marginBottom:10}}>
                                 <Button style={{height:10, width:10}} color = 'green' title = {item.username_who_like}  onPress={()=>{this.setState({forWhoThisLetter:item.user_id_who_like, forWhoThisLetterName:item.username_who_like })}}/>
                              </View>
                        </TouchableWithoutFeedback>
                        }
                      />
                 </View>
        )
    }

    get messageLIstForm(){
        let result = []
        let i = 0
         for(const item in this.state.listMessages){
            result.push(<Text style={{fontSize:14 , borderColor:'grey', borderWidth:2, marginBottom:15}} key={i}> <Text style={{color: 'black'}}>User {this.state.listMessages[item].username_who_send_message} says you:</Text>  {this.state.listMessages[item].text_message} </Text>)
             i++
         }
        return result
    }

    get messagesListForm(){
        return(
            !this.state.createLetter ?
            <View style={{ width: 400, height: 500, borderRadius:25, backgroundColor:'white', flex:1, alignItems:'center'}}>
                <View style={{height: 300, marginTop:30}}>{this.messageLIstForm}</View>
                <View style={{width: 250}}><Button style={{width: 250}} color = 'grey' title ='Create message' onPress={()=>{this.getTargetUsersForMessages()}}/></View>
                <View style={{width: 250}}><Button style={{width: 250}} color = 'grey' title ='Back to account' onPress={()=>{this.setState({openUserInfoPage:false, userInSearch:false,
                openNotificationsList:false, createLetter:false, openMessagesForm:false})}}/></View>
            </View> :
            <View style={{  width: 400, height: 500, borderRadius:25, backgroundColor:'white', flex:1, alignItems:'center'}}>
                <View style={{marginTop:40}}><Text style={{ fontSize:16 }}> Create message here </Text></View>
                <TextInput style={{width: 250, borderColor:'grey', borderRadius:10, borderWidth:1}} placeholder="Enter text message here" onChangeText={(text)=>{this.setState({textLetter:text})}}/>
                   {this.userSelectForSendMessage}
                 <View style = {{width:250, marginBottom: 20}}><Button color = 'grey' title ='Send Message' onPress={()=>{this.sendMessage()}}/></View>

                 <View style = {{width:250, marginBottom: 20}}><Button color = 'grey' title ='Message list' onPress={()=>{this.messageList()}}/></View>
                  <View style = {{width:250, marginBottom: 20}}><Button color = 'grey' title ='Back to account' onPress={()=>{this.backToAck()}}/></View>

            </View>

        )
    }
    backToAck(){
        this.setState({openUserInfoPage:false, userInSearch:false, openNotificationsList:false, createLetter:false, openMessagesForm:false})
    }

    messageList(){
        this.setState({openUserInfoPage:false, userInSearch:false, openNotificationsList:false, createLetter:false})
    }

get userName(){
    return (
        this.state.userName ? <Text style={{fontSize: 16, paddingBottom: 15}}>Username: {this.state.userName}</Text>:null
    )
}
get firstName(){
    return (this.state.firstName ? <Text style={{fontSize: 16, paddingBottom: 15}}>First name: {this.state.firstName}</Text>:null)
}
get lastName(){
    return (this.state.lastName ? <Text style={{fontSize: 16, paddingBottom: 15}}>Last Name:{ this.state.lastName}</Text>:null)
}
get aboutUser(){
    return ( this.state.aboutUser ? <Text style={{fontSize: 16, paddingBottom: 15}} >About user: {this.state.aboutUser}</Text>:null)
}
get chosenSkillsList(){
    return (this.state.developerSkills.length>0 ?
                    <View>
                         <Text style={{fontSize: 20}}>Chosen skills list: </Text>
                        {this.state.developerSkills}
                    </View>:null)
}
get skillOfUser(){
    return (this.state.developerSkills ? <Text style={{fontSize: 16, paddingBottom: 15}} >User skill: {this.state.developerSkills}</Text>:null)
}
    get thirdScreen(){
            return (
                this.state.openCompetitionForm ? this.competitionFormScreen :
                this.state.openNotificationsList ? this.notificationsListForm :
                this.state.openMessagesForm ? this.messagesListForm:
                <View style={{borderRadius: 25,top:0, marginTop:0, backgroundColor:'white', width:400, height:500, alignItems:'center'}}>
                    {this.userName}
                    {this.firstName}
                    {this.lastName}
                    <View>
                       { this.aboutUser}
                    </View>
                    {this.skillOfUser}

                    <View style={{paddingTop: 20 , backgroundColor:'white'}}>
                    <View style = {{marginTop: 20, marginBottom: 20,width:250}}>
                        <Button color='grey'  title ='Create idea' onPress={()=>{this.setState({openCompetitionForm:true})}}/>
                    </View>
                    <View style = {{marginBottom: 20,width:250}}>
                        <Button color='grey'  title ='Search projects' onPress={()=>{this.pressGoToSearchButton()}}/>
                    </View>
                    <View style = {{marginBottom: 20,width:250}}>
                        <Button color='grey'  title ='Update Profile' onPress={()=>{this.pressButtonHandle(false)}}/>
                    </View>
                    <View style = {{marginBottom: 20,width:250}}>
                        <Button color='grey'  title ='Notifications' onPress={()=>{this.openNotifications()}}/>
                    </View>
                    <View style = {{ width:250}}>
                        <Button color='grey'  title ='Messages' onPress={()=>{this.openMessages()}}/>
                    </View>
                    </View>
                </View>)
    }

    openNotifications(){
        this.getItemsForNotifications()
        this.setState({openNotificationsList:true})
    }

    openMessages(){
        this.getMessages()
        this.setState({openMessagesForm:true})
    }

    setSelectedValuePickerDeveloper(itemValue,itemIndex){
        let chose = this.state.developerSkills
        chose.push(itemValue)
        this.setState({developerSkills: chose})
    }

    sendIdeaForCompetitionAnonSedByPlatform(){
        this.handleCreateProject()
        this.setState({openUserInfoPage:false, userInSearch:false, openCompetitionForm:false})
    }

    handleDeleteSkill(choseName){
        let chooses = this.state.developerSkills
        chooses.splice(chooses.indexOf(choseName), 1);
        this.setState({developerSkills:chooses})
    }

    get developerSkillsList(){
        let result = []
        for(const chose in this.state.developerSkills){
            result.push( <Text key={chose}> {this.state.developerSkills[chose]} </Text>)
        }
        return this.state.developerSkills
    }

    get developerSkillsChoise(){
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
        chooses.splice(chooses.indexOf(currentSkillName), 1);
        this.setState({developerSkills:chooses})
    }
        get requirementsSkillsForProject(){
        //отрисовывает скилы девелопера с возможностью их удаления

         return (this.state.requirementSkillsOfProject ? <Text style={{fontSize: 16, paddingBottom: 15}} >User skill: {this.state.requirementSkillsOfProject}</Text>:null)
    }

    setProfessionalSize(itemValue){
        this.setState({professionalSize:itemValue})
    }

    get profileMenu(){
        return (
                    <View style={{ borderRadius: 25, width:400, height:400, backgroundColor:'white', alignItems:'center'}}>
                        <View>
                            <Text style={{ fontSize: 18 }}>You are a: </Text>
                            <View style={{flexDirection: "row"}}>
                                <View style={{paddingLeft:5 ,width: 130}}><Button color= {this.state.professionalSize=='Individual'?'green':'grey'} title = 'Individual' onPress = {()=>{this.setState({professionalSize:'Individual'})}}/></View>
                                <View style={{paddingLeft:5 ,width: 130}}><Button color={this.state.professionalSize=='Collective'?'green':'grey'} title = 'Collective' onPress = {()=>{this.setState({professionalSize:'Collective'})}}/></View>
                                <View style={{paddingLeft:5 ,width: 130}}><Button color={this.state.professionalSize=='Organisation'?'green':'grey'} title = 'Organisation' onPress = {()=>{this.setState({professionalSize:'Organisation'})}}/></View>
                            </View>
                        </View>
                        <View style={{paddingTop: 20}}>
                            {this.chooseSkills}
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={{ fontSize: 18 }}> Write your country/location: </Text>
                            <View style={{flexDirection: "row"}}>
                                <View style={{paddingLeft:5, paddingTop:10 ,width: 130}}><Button color= {this.state.theNameOfUserLocation=='Georgia'?'green':'grey'} title = 'Georgia' onPress = {()=>{this.setState({theNameOfUserLocation:'Georgia'})}}/></View>
                                <View style={{paddingLeft:5,paddingTop:10 ,width: 130}}><Button color={this.state.theNameOfUserLocation=='Belarus'?'green':'grey'} title = 'Belarus' onPress = {()=>{this.setState({theNameOfUserLocation:'Belarus'})}}/></View>
                                <View style={{paddingLeft:5,paddingTop:10 ,width: 130}}><Button color={this.state.theNameOfUserLocation=='Lithuania'?'green':'grey'} title = 'Lithuania' onPress = {()=>{this.setState({theNameOfUserLocation:'Lithuania'})}}/></View>
                            </View>
                        </View>
                        <View style={{marginTop: 20}}>
                        <Text style={{ fontSize: 18 }} >Tell us about yourself </Text>
                            <TextInput maxLength={40} placeholder="About you.. " onChangeText={(text)=>{this.setState({aboutUser:text})}}/>
                        </View>
                           <View style={{marginTop:30,width:250}}><Button style={{width:250}} color='grey' title ='Save info' onPress={()=>{this.pressButtonSaveInfo()}}/></View>

                    </View>
                )
     }

    goToStart(){
        this.setState({userLogged:false, openLoginScreen:false})
    }

    setRequirementSkillsOfProject(itemValue,itemIndex){
        let chose = this.state.requirementSkillsOfProject
        chose.push(itemValue)
        this.setState({requirementSkillsOfProject: chose})
    }

    get competitionFormScreen(){
        return (
                <View style={{marginTop:100, borderRadius: 25, backgroundColor:'white',top:0, width:400, height:500, alignItems:'center'}}>
                    <View style={{paddingTop: 30}}>
                        <TextInput  style= {{borderRadius: 10, borderWidth:  1, borderColor: 'grey'}} placeholder="Enter Name of your project" onChangeText={(text)=>{this.setState({competitionProjectName:text})}}/>
                        <TextInput style= {{borderRadius: 10, borderWidth:  1, borderColor: 'grey'}} maxLength={40} placeholder="Enter about your project " onChangeText={(text)=>{this.setState({competitionProjectDescription:text})}}/>
                   </View>
                    <View>
                        {this.chooseSkillsForProject}
                    </View>
                        {this.requirementsSkillsForProject}
                    <View style={{paddingTop:100, width:250}}>
                        <View style={{marginBottom: 20}}>
                            <Button style={{width:250}} color = 'grey' title ='Go back' onPress={()=>{this.setState({openCompetitionForm:false})}}/>
                        </View>
                        <View>
                            <Button  style={{width:250}} color = 'grey' title ='Send your idea' onPress={()=>{this.sendIdeaForCompetitionAnonSedByPlatform()}}/>
                        </View>
                    </View>
                </View>
        )
    }

    get chooseTheatreSkills(){
        return(
            <View>
                <Text style={{fontSize:18}}>Indicate the skills:</Text>
                <View style={{flexDirection: "row"}}>
                    <View style={{paddingLeft: 5}}><Button color={this.state.developerSkills=='dansing'?'green':'grey'} title = 'Dansing' onPress = {()=>{this.setState({developerSkills:'dansing'})}}/></View>
                    <View style={{paddingLeft: 5}}><Button color={this.state.developerSkills=='singing'?'green':'grey'} title = 'Singing' onPress = {()=>{this.setState({developerSkills:'singing'})}}/></View>
                    <View style={{paddingLeft: 5}}><Button color={this.state.developerSkills=='juggling'?'green':'grey'} title = 'Juggling' onPress = {()=>{this.setState({developerSkills:'juggling'})}}/></View>
                </View>
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
                <Text style={{fontSize: 20}}>Indicate the skills:</Text>
                <Button color={this.state.requirementSkillsOfProject=='dansing'?'green':'grey'} title = 'Dansing' onPress = {()=>{this.setState({requirementSkillsOfProject:'dansing'})}}/>
                <Button color={this.state.requirementSkillsOfProject=='singing'?'green':'grey'} title = 'Singing' onPress = {()=>{this.setState({requirementSkillsOfProject:'singing'})}}/>
                <Button color={this.state.requirementSkillsOfProject=='juggling'?'green':'grey'} title = 'Juggling' onPress = {()=>{this.setState({requirementSkillsOfProject:'juggling'})}}/>
            </View>
        )
    }

    setSelectedValuePickerSkillsForProject(itemValue,itemIndex){
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
                <Button color='grey' title = 'Login' onPress = {()=>{this.setState({openSignUpScreen:false, openLoginScreen:true})}}/>
                </View>
                <View style={{marginTop:20}}>
                <Button color='grey'  title = 'SignUp' onPress = {()=>{this.setState({openSignUpScreen:true, openLoginScreen:false})}}/>
                </View>
            </View> : this.loginOrSignUpScreen
        )
    }

    setMatchingData(){
         fetch('https://fbf3db53157e.ngrok.io/get_match', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: this.state.userId,
          })
      }).then(function (response) { return response.json(); }).then((data) =>{
          if(data.result){
            this.setState({
                carouselData:data.result,
                currentCarouselItemId:data.result[0].id
              })
          }
      }).catch(err => {
        console.log('ERROR here: ', err);
      });
    }


    handleLoginSubmit(){
      fetch('https://fbf3db53157e.ngrok.io/login', {
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
    }

    handleRegisterSubmit(){
    let userId =''
      fetch('https://fbf3db53157e.ngrok.io/register', {
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
        this.setState({userId:data.userId,openSignUpScreen:false,userLogged:true,newUser:true})
      }).catch(err => {
        console.log('ERROR here: ', err);
      });

    }

    handleUpdateUser(){
      fetch('https://fbf3db53157e.ngrok.io/update_user', {
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
      }).catch(err => {
        console.log('ERROR here: ', err);
      });

    }


    handleCreateProject(){
      fetch('https://fbf3db53157e.ngrok.io/create_project', {
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
      }).catch(err => {

        console.log('ERROR here: ', err);
      });
    }

    setLikeToBackend(){
         fetch('https://fbf3db53157e.ngrok.io/set_like', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            likeFrom: this.state.userId,
            likeTo: this.state.currentCarouselItemId
          })
      }).then(function (response) { return response.json(); }).then((data) =>{
              return Alert.alert(
         'Your reaction was send!'
      )
      }).catch(err => {
        console.log('ERROR here: ', err);
      });
    }


    getItemsForNotifications(){
       fetch('https://fbf3db53157e.ngrok.io/get_notifications', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            notificationsFromUserId: this.state.userId,
          })
      }).then(function (response) { return response.json(); }).then((data) =>{
        this.setState({notificationItems:data,openNotificationsList:true})
      }).catch(err => {
        console.log('ERROR here: ', err);
      });
    }

    getMessages(){
         fetch('https://fbf3db53157e.ngrok.io/get_messages', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messagesForUser: this.state.userId,
          })
      }).then(function (response) { return response.json(); }).then((data) =>{
        this.setState({listMessages:data,openMessagesForm:true})
      }).catch(err => {
        console.log('ERROR here: ', err);
      });
    }

    getTargetUsers(){
         fetch('https://fbf3db53157e.ngrok.io/get_target_users', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messagesForUser: this.state.userId,
          })
      }).then(function (response) { return response.json(); }).then((data) =>{
        this.setState({listUsersToWhoCanWriteMessage:data})
      }).catch(err => {
        console.log('ERROR here: ', err);
      });
    }

    sendMessage(){
        fetch('https://fbf3db53157e.ngrok.io/send_message', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          whoSend: this.state.userId,
            sendForUser: this.state.forWhoThisLetter,
            textLetter: this.state.textLetter
          })
      }).then(function (response) { return response.json(); }).then((data) =>{
        this.setState({openUserInfoPage:false, userInSearch:false, openNotificationsList:false, createLetter:false, openMessagesForm:false})
      }).catch(err => {
        console.log('ERROR here: ', err);
      });
    }

    get signUpScreen(){
        return (
            <View style={{width: 400, height:500,borderRadius: 25,backgroundColor:'white', alignItems:'center'}}>
                <TextInput style= {{ height: 40, width:350, marginTop:90, marginBottom:20,borderRadius: 10, borderWidth:  1, borderColor: 'grey'}} onChangeText={(text)=>{this.setState({userName:text})}} placeholder="Username" />
                <TextInput style= {{ height: 40,width:350,marginBottom:10, borderRadius: 10, borderWidth:  1, borderColor: 'grey'}} onChangeText={(text)=>{this.setState({firstName:text})}} placeholder="FirstName"/>
                <TextInput style= {{height: 40,width:350,marginBottom:10, borderRadius: 10, borderWidth:  1, borderColor: 'grey'}} onChangeText={(text)=>{this.setState({lastName:text})}} placeholder="LastName"/>
                <TextInput style= {{height: 40,width:350,marginBottom:10, borderRadius: 10, borderWidth:  1, borderColor: 'grey'}} placeholder="Enter Email" onChangeText={(text)=>{this.setState({loginEmail:text})}}/>
                <TextInput style= {{height: 40,width:350, marginBottom:10,borderRadius: 10, borderWidth:  1, borderColor: 'grey'}} onChangeText={(text)=>{this.setState({loginPswd:text})}} secureTextEntry={true} placeholder="Enter Password"/>
                <View style={{width:300}}><Button color='grey' style= {{ width:250, borderRadius: 10, borderWidth:  1, borderColor: 'grey'}} title = 'Submit' onPress = {()=>{this.handleRegisterSubmit()}}/></View>
                <View style={{paddingTop: 10, width:300}}>
                    <Button color = 'grey' title = 'Back' onPress = {()=>{this.setState({openSignUpScreen:false,openLoginScreen:false})}}/>
                </View>
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
        return (
           <View style={{borderRadius: 25,backgroundColor: 'white' , height:400, width:320, alignItems:'center' }}>
           <View style={{marginTop:100}}>
            <TextInput style= {{borderRadius: 10, borderWidth:  1, borderColor: 'grey'}} placeholder="Email" onChangeText={(text)=>{this.setState({loginEmail:text})}}/>
            <View style={{marginTop: 30}}><TextInput
            style= {{borderRadius: 10, borderWidth:  1, borderColor: 'grey'}}
            onChangeText={(text)=>{this.setState({loginPswd:text})}}
              secureTextEntry={true}
              placeholder="Enter Password"
            /></View>
            </View>
            <View style={{paddingTop: 80, width:300}}>
                <Button color = 'grey' title = 'Login' onPress = {()=>{this.handleLoginSubmit()}}/>
            </View>
            <View style={{paddingTop: 10, width:300}}>
                <Button color = 'grey' title = 'Back' onPress = {()=>{this.setState({openSignUpScreen:false,openLoginScreen:false})}}/>
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
        </View>);
    }

    get createUpdateScreen(){
    // экран выбора статуса , кем юзер хочет быть
        return (
                <View style={{marginTop: -200,flex:1,alignItems: 'center', justifyContent: 'center',backgroundColor:'white', height:500}}>
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
