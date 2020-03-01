import React, {Component} from 'react'; 
import * as firebase 	  from 'firebase/app';
import messagesRef 		  from '../firebase';
import dataRef 			  from '../firebase';
import '../css/style.css';
import '../scripts/script.js';
 




class LiveChat extends Component {
		constructor(props) {
		super(props);

	    this.setWrapperRef 	    = this.setWrapperRef.bind(this);
	    this.handleClickOutside = this.handleClickOutside.bind(this);

		this.state = {
			signupUsername: 		'',
			isValidSignupUsername:  false,
			signupPassword: 		'',
			signupEmail: 			'',
			isvalidSignUpMail: 		false,
			user: 					{},
			openLogin: 				false,
			loginPassword: 			'',
			loginEmail: 			'',
			openSignup: 			false,
			signin_emailErr: 		false,
			signin_passErr: 		false,
			signup_emailInUse: 		false,
			signup_badPassword:     false,
			signup_emailBadFormat:  false,
			recoverPassword: 		'',
			isvalidRecoverMail: 	false,
			msgTwo: 				[],
			inputMsg: 				'',
			isScrollOnBottom: 		false,
			scrollToBottomAtStart:  true,
			inactiveScroll: 		true,
			noMsgToFetch: 			false,
			openChatOptions: 		false,
			openEmojiList: 			false,
			emojiFirstRowIcons: [{
						className:'smile_icon',
						code: '🙂'
					},
					{
						className:'sad_icon',
						code: '🙁'
					},
					{
						className:'wink_icon',
						code:'😉'
					}],
			emojiSecRowIcons: [{
						className:'gring_icon',
						code: '😀'
					},
					{
						className:'laugh_icon',
						code: '😄'
					},
					{
						className:'like_icon',
						code:'👍'
					},
					{
						className:'dislike_icon',
						code:'👎'
					}]
		}
	}


usernameSignupHandler(e) {
	let usernameSignupDiv = document.querySelector('.cp_signup_username_input');

	if (e.target.value.length > 3) {

		this.setState({
			signupUsername: e.target.value,
			isValidSignupUsername: true
		})
		usernameSignupDiv.style.borderBottom = 'solid #000000';
	} else {
		this.setState({
			signupUsername: '',
			isValidSignupUsername: false
		})

		usernameSignupDiv.style.borderBottom = 'solid #F91F1F';
	}
}

passwordSignupHandler(e) {
	let showHidePassImg = document.querySelector('.showHidePass_signupImg');
	// if password is higher than  5, set value
		if (e.target.value.length > 5) {
			this.setState({
				signupPassword: e.target.value
			})
		} else if(e.target.value.length === 0) {
			// if password length = 0, set value to none
			this.setState({
				signupPassword: ''
			})
		}

			// show/hide the show/hide password icon 
		if (e.target.value.length > 0) {
			showHidePassImg.style.display = 'block';
		} else {
			showHidePassImg.style.display = 'none';
		}
}

emailSignupHandler(e) {
	// check if email input is valid 
	let mailformat    = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		inputEmailDiv = document.querySelector('.cp_signup_email_input');

	// if email is valid
	if (e.target.value.match(mailformat)) {
		this.setState({
			signupEmail: e.target.value,
			isvalidSignUpMail: true
		})
		inputEmailDiv.style.borderBottom = 'solid #000000';
	} else if (e.target.value.length === 0) {
		this.setState({
			signupEmail: '',
			isvalidSignUpMail: true
		})
		inputEmailDiv.style.borderBottom = 'solid #000000';
	} else {
		inputEmailDiv.style.borderBottom = 'solid #FF0000';
		this.setState({
			isvalidSignUpMail: false
		})
	}
}


loginPasswordHandler(e) {
	let showHidePassImg = document.querySelector('.showhidepass_signin_img');

		if (e.target.value.length > 2) {
			this.setState({
				loginPassword: e.target.value
			})
		}

		if (e.target.value.length > 0) {
			showHidePassImg.style.display = 'block';
		} else {
			showHidePassImg.style.display = 'none';
		}
}

loginEmailHandler(e) {
	if (e.target.value.length > 2) {
		this.setState({
			loginEmail: e.target.value
		})
	} else if(e.target.value.length === 0) {
		this.setState({
			loginEmail: ''
		})
	}
}

forgotPassHandler(e) {
	// check if email input is valid 
	let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		forgotPassDiv = document.querySelector('.forgot_pass_input_div');

	// if email is valid
	if (e.target.value.match(mailformat)) {
		this.setState({
			recoverPassword: e.target.value,
			isvalidRecoverMail: true
		})
		forgotPassDiv.style.borderBottom = 'solid #000000';

	} else if (e.target.value.length === 0) {
		this.setState({
			recoverPassword: '',
			isvalidRecoverMail: true
		})
		forgotPassDiv.style.borderBottom = 'solid  #000000';
	} else {
		forgotPassDiv.style.borderBottom = 'solid  #FF0000';
		this.setState({
			isvalidRecoverMail: false
		})
	}

}


sendNewPassword() {
	let forgot_pass_input_div = document.querySelector('.forgot_pass_input_div');

	if (this.state.isvalidRecoverMail) {
		forgot_pass_input_div.style.borderBottom = 'solid green';
		firebase.auth().sendPasswordResetEmail(this.state.recoverPassword)
			.then(() => {
				document.querySelector('.forgot_pass_butt').innerHTML = 'Resend';
				forgot_pass_input_div.style.borderBottom = 'solid #000000';

				setTimeout(function () {
					forgot_pass_input_div.style.borderBottom = 'solid #000000';
				}, 2000)
			})
			.catch((err) => console.log(err))
	} else {
		forgot_pass_input_div.style.borderBottom = 'solid #FF0000';
		setTimeout(function () {
			forgot_pass_input_div.style.borderBottom = 'solid #000000';
		}, 1000)
		setTimeout(function () {
			forgot_pass_input_div.style.borderBottom = 'solid #FF0000';
		}, 1500)
		setTimeout(function () {
			forgot_pass_input_div.style.borderBottom = 'solid #000000';
		}, 2000)
	}
}

selectRandomImgProfile() {
	let no = Math.floor(Math.random() * Math.floor(3));

	// select random preselected avatar image when user is signin up
	if (no === 0) {
		return 'https://cdn2.iconfinder.com/data/icons/emoticons-17/24/emoticons-03-512.png';
	} else if (no === 1) {
		return 'https://cdn2.iconfinder.com/data/icons/emoticons-17/24/emoticons-01-512.png';
	} else if (no === 2) {
		return 'https://cdn2.iconfinder.com/data/icons/emoticons-17/24/emoticons-08-256.png';
	} else if (no === 3) {
		return 'https://cdn2.iconfinder.com/data/icons/emoticons-17/24/emoticons-09-256.png';
	}
}

updateProfileInfo() {
	// after account was created, update user name info
	let user = firebase.auth().currentUser;

	// set the name for user
	user.updateProfile({
		displayName: this.state.signupUsername,
		photoURL: this.selectRandomImgProfile()
	})

}

chatInputHandler(e) {
	let chatArrowButton = document.querySelector('.send_msg_arrow'),
		chatInput 		= document.querySelector('.chat_input');

	// if there is value >
	if (e.target.value.length > 0) {

		// display arrow button inside input if there is value
		chatArrowButton.style.opacity = '1';
		this.setState({
			inputMsg: e.target.value
		})

	} else if (e.target.value.length === 0) {

		chatArrowButton.style.opacity = '0.6';

		// clear state value and input value if chat input has no value
		this.setState({
			inputMsg: ''
		})
		chatInput.value = '';
	}
}


saveMessages(message, className, username, photoURL, displayOptions, dateTime, displayDateTime) {
	let send_arrow_div = document.querySelector('.send_arrow_div');

		send_arrow_div.style.pointerEvents = 'none';

		// disable arrow chat button for 0,7
		setTimeout(function () {
			send_arrow_div.style.pointerEvents = 'visible';
		}, 700);

		let chatInsideScroll = document.querySelector('.chat_inside_scroll');
		// to the messagesRef (created on firebase/index.js), push new created message
		let newMessagesRef = messagesRef.push();
		// set the newmessages data

		// loop through messages and find special entity emoticons code 
		//and replace text with icon
		let newArr = message.split(' ');

		for (let i = 0; i < newArr.length; i++) {
			if (newArr[i] === ':)') {
				newArr[i] = ' 😊';
			} else if (newArr[i] === ':(') {
				newArr[i] = ' 🙁';
			} else if (newArr[i] === ':D') {
				newArr[i] = ' 😀';
			} else if (newArr[i] === ':))') {
				newArr[i] = ' 😄';
			} else if (newArr[i] === ':like') {
				newArr[i] = ' 👍';
			} else if (newArr[i] === ':dislike') {
				newArr[i] = '👎';
			} else if (newArr[i] === ';)') {
				newArr[i] = ' 😉';
			}
		}

		// order the message after replacing emoji
		let finalMsg = newArr.join(' ');

		// set values to message before send
		newMessagesRef.set({
				key: newMessagesRef.key,
				message: finalMsg,
				className: 'chat_msg',
				username: username,
				photoURL: photoURL,
				displayOptions: displayOptions,
				dateTime: dateTime,
				displayDateTime: displayDateTime
			}).then(() => {

				// scroll to bottom
				if (this.state.inactiveScroll) {
					chatInsideScroll.scrollTop = chatInsideScroll.scrollHeight;
				}

				// in user scroll view is at bottom, scroll to bottom on every new msg
				// if user scroll is up, do nothing.
				if (this.state.isScrollOnBottom) {
					chatInsideScroll.scrollTop = chatInsideScroll.scrollHeight;
				} else {
					let defaultScroll = chatInsideScroll.scrollTop;

					chatInsideScroll.scrollTop = defaultScroll;
				}

				// clear input after submit		
				this.setState({
					inputMsg: ''
				})

			})
			.catch((err) => console.log('Error: ' + err))
}

submitForm(e) {
	// SEND MSG EVENT HANDLER

	let chatInput 		= document.querySelector('.chat_input'),
		chatArrowButton = document.querySelector('.send_msg_arrow');

	// close emoji list
	if (this.state.openEmojiList) {
		this.setState({
			openEmojiList: false
		})
	}
	// focus on chatinput after submit
	chatInput.focus();
	// close chat menu
	if (this.state.openChatOptions) {
		this.setState({
			openChatOptions: false
		})
	}

	let message 		= this.state.inputMsg,
		className		= 'chat_msg',
		username 		= this.state.user.displayName ? this.state.user.displayName : false,
		photoURL 		= this.state.user.photoURL ? this.state.user.photoURL : undefined,
		displayOptions  = false,
		displayDateTime = false;

	// get time when the message was submitted
	let today 	 = new Date(),
		date  	 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
		time     = today.getHours() + ":" + today.getMinutes(),
		dateTime = date + ' at ' + time;


	if (this.state.inputMsg.length > 0) {
		// if there is value, exec submit msg with 0.5s delay
		setTimeout(() => {
			this.saveMessages(message, className, username, photoURL, displayOptions, dateTime, displayDateTime);

		}, 500);
		// opacity 0.6 for submit arrow button
		chatArrowButton.style.opacity = '0.6';
		// clear chat input after submit msg
		setTimeout(() => {
			// clear chat input value after submit
			chatInput.value = '';
			// clear setstate value after submit
			this.setState({
				inputMsg: ''
			})
		}, 100);

	} else if (this.state.inputMsg.length === 0) {
		// if there is no value, return false
		return false;
	}
}

msgInputKeyHandler(e) {
	if (e.key === 'Enter') {
		this.submitForm(e);
	} else {
		return false;
	}
}

signUp(e) {

	let signupButton 	  = document.querySelector('.cp_button_signup'),
		signInDiv 	      = document.querySelector('.half_first_div'),
		signUpDiv 	 	  = document.querySelector('.half_sec_div'),
		cpUserSignup 	  = document.querySelector('.cp_user_signup'),
		userInput 		  = document.querySelector('.signup_username_input'),
		emailInput 		  = document.querySelector('.signup_email_input'),
		passInput 		  = document.querySelector('.signup_password_input'),
		signinTxt 		  = document.querySelector('.signin_txt'),
		signupTxt 		  = document.querySelector('.signup_txt'),
		userInputDivWrap  = document.querySelector('.cp_signup_username_input'),
		emailInputDivWrap = document.querySelector('.cp_signup_email_input'),
		passInputDivWrap  = document.querySelector('.cp_signup_password_input'),
		welcomeDiv 		  = document.querySelector('.welcome_div'),
		letschat 		  = document.querySelector('.letschat'),
		roundFirst 		  = document.querySelector('.round_first'),
		roundSec 		  = document.querySelector('.round_sec');
				

	// if any .red line errors were left, change to default
	document.querySelector('.cp_signup_username_input').style.borderBottom = 'solid black';
	document.querySelector('.cp_signup_email_input').style.borderBottom    = 'solid black';
	document.querySelector('.cp_signup_password_input').style.borderBottom = 'solid black';

	if (this.state.signupUsername !== '' && this.state.isValidSignupUsername) {
		firebase.auth().createUserWithEmailAndPassword(this.state.signupEmail, this.state.signupPassword)
			.then((u) => {
				this.updateProfileInfo();
				console.log('Account created');

				// set states to default / clear inputs if there is any value inside
				this.setState({
					signupUsername: '',
					signupPassword: '',
					signupEmail: '',
					isvalidSignUpMail: false
				})

				// animate input icons		
				userInput.style.opacity = '0';
				userInput.style.backgroundPosition = '60px';
				emailInput.style.opacity = '0';
				emailInput.style.backgroundPosition = '60px';
				passInput.style.opacity = '0';
				passInput.style.backgroundPosition = '60px';

				// animate signup button
				signupButton.style.marginTop = '170px';

				// give opacity 0 to Sign up user cp div
				setTimeout(function () {
					cpUserSignup.style.opacity = '0';

					signinTxt.style.display = 'none';
					signupTxt.style.display = 'none';
				}, 500);


				// hide signup/signin div to display signup div
				setTimeout(function () {
					// hide Sign up user cp div
					cpUserSignup.style.display = 'none';

					// display Sign up and Sign in divs (animation slider)
					signInDiv.style.display = 'block';
					signUpDiv.style.display = 'block';
				}, 800);

				setTimeout(function () {
					// animate sign up and sign in divs (slide down/up)
					signInDiv.style.marginTop = '0.1px';
					signUpDiv.style.marginTop = '0.1px';

					// clear the name, email and pass inputs
					userInput.value  = '';
					emailInput.value = '';
					passInput.value  = '';

					// set the border to black if there were any errors
					userInputDivWrap.style.borderBottom  = 'solid #000000';
					emailInputDivWrap.style.borderBottom = 'solid #000000';
					passInputDivWrap.style.borderBottom  = 'solid #000000';

				}, 1000);

				setTimeout(function () {
					signInDiv.style.marginTop = '-250px';
					signUpDiv.style.marginTop = '450px';

					//change font size to to fit inside round div
					letschat.style.fontSize = '15px';
					// change 'Let's chat' text innerhtml
					letschat.innerHTML 		= 'Your account has been successfully created.<br/> You will be redirected in 3 sec...';
				}, 1800)
				setTimeout(function () {
					// display none to Sign in and Sign up cp user divs
					signInDiv.style.display 	= 'none';
					signUpDiv.style.display 	= 'none';
					// set transition to animate round bubble
					roundFirst.style.transition = '2s all ease-in-out';
					roundSec.style.transition 	= '2s all ease-in-out';
				}, 2400)

				setTimeout(function () {
					// display Welcome div after account has been created
					welcomeDiv.style.display = 'block';

					// change round bubble to .green (access allowed);
					roundFirst.style.backgroundColor = '#40FA27';
					roundSec.style.backgroundColor   = '#40FA27';

				}, 2600)
				setTimeout(function () {
					// fade opacity after
					welcomeDiv.style.opacity = '1';

					// show the signin and signup text
					signinTxt.style.display = 'block';
					signupTxt.style.display = 'block';
				}, 2800)
				setTimeout(function () {
					// redirect to main page after 3 sec
					welcomeDiv.style.opacity = '1';
					window.location.reload();
				}, 6000)

			}).catch((error) => {
					// hide all the error msg if there are any
					this.setState({
						signup_emailInUse: false,
						signup_badPassword: false,
						signup_emailBadFormat: false
					});

				// if one input is invalid, warn the user by turning the bottom border to .red/.black;
				if (error.code === 'auth/email-already-in-use') {
					this.setState({
						signup_emailInUse: true,
						signup_badPassword: false,
						signup_emailBadFormat: false
					});
					document.querySelector('.cp_signup_email_input').style.borderBottom = 'solid #FF0000';
					setTimeout(function () {
						document.querySelector('.cp_signup_email_input').style.borderBottom = 'solid #000000';
					}, 1000);
					setTimeout(function () {
						document.querySelector('.cp_signup_email_input').style.borderBottom = 'solid #FF0000';
					}, 1500);
					setTimeout(function () {
						document.querySelector('.cp_signup_email_input').style.borderBottom = 'solid #000000';
					}, 2000);
				} else if (error.code === 'auth/weak-password') {
					this.setState({
						signup_badPassword: true,
						signup_emailInUse: false,
						signup_emailBadFormat: false

					});
					document.querySelector('.cp_signup_password_input').style.borderBottom = 'solid #FF0000';
					setTimeout(function () {
						document.querySelector('.cp_signup_password_input').style.borderBottom = 'solid #000000';
					}, 1000);
					setTimeout(function () {
						document.querySelector('.cp_signup_password_input').style.borderBottom = 'solid #FF0000';
					}, 1500);
					setTimeout(function () {
						document.querySelector('.cp_signup_password_input').style.borderBottom = 'solid #000000';
					}, 2000);
				} else {
					this.setState({
						signup_emailBadFormat: true,
						signup_badPassword: false,
						signup_emailInUse: false
					});
					document.querySelector('.cp_signup_email_input').style.borderBottom = 'solid #FF0000';

					setTimeout(function () {
						document.querySelector('.cp_signup_email_input').style.borderBottom = 'solid #000000';
					}, 1000);
					setTimeout(function () {
						document.querySelector('.cp_signup_email_input').style.borderBottom = 'solid #FF0000';
					}, 1500);
					setTimeout(function () {
						document.querySelector('.cp_signup_email_input').style.borderBottom = 'solid #000000';
					}, 2000);
				}
			});

	} else {
		let inputUsernameDiv = document.querySelector('.cp_signup_username_input');
		inputUsernameDiv.style.borderBottom = 'solid #FF0000';

		setTimeout(function () {
			inputUsernameDiv.style.borderBottom = 'solid #000000';
		}, 1000);
		setTimeout(function () {
			inputUsernameDiv.style.borderBottom = 'solid #FF0000';
		}, 1500);
		setTimeout(function () {
			inputUsernameDiv.style.borderBottom = 'solid #000000';
		}, 2000);

	}
}


signUpKeyHandler(e) {
	if (e.key === 'Enter') {
		this.signUp(e);
	} else {
		return false;
	}
}

signUpShowHidePass(e) {
	let signup_password_input = document.querySelector('.signup_password_input');

	signup_password_input.focus();

	// toggle icon show/hide password
	e.target.classList.toggle('hidePass_signup');
	// if input type is 'password' do..
	if (signup_password_input.type === 'password') {
		signup_password_input.type = 'text';
	} else {
		signup_password_input.type = 'password';
	}

}
signUpBack() {
	let signupButton       = document.querySelector('.cp_button_signup'),
		signInDiv          = document.querySelector('.half_first_div'),
		signUpDiv          = document.querySelector('.half_sec_div'),
		cpUserSignup       = document.querySelector('.cp_user_signup'),
		userInput          = document.querySelector('.signup_username_input'),
		emailInput         = document.querySelector('.signup_email_input'),
		passInput   	   = document.querySelector('.signup_password_input'),
		userInputDivWrap   = document.querySelector('.cp_signup_username_input'),
		emailInputDivWrap  = document.querySelector('.cp_signup_email_input'),
		passInputDivWrap   = document.querySelector('.cp_signup_password_input'),
		signUpHideShowPass = document.querySelector('.showHidePass_signupImg');

	// hide show/hide password icon
	signUpHideShowPass.style.display = 'none';

	// clear inputs
	this.setState({
		signup_emailBadFormat: false,
		signup_emailInUse: false,
		signup_badPassword: false
	})

	// animate to top signup button
	signupButton.style.marginTop = '170px';

	// hide cp user div box
	setTimeout(function () {
		cpUserSignup.style.opacity = '0';
	}, 500);


	// hide signup/signin div to display signup div
	setTimeout(function () {
		// display none for cp user div box
		cpUserSignup.style.display = 'none';
		// display signin/signup user cp half
		signInDiv.style.display = 'block';
		signUpDiv.style.display = 'block';
	}, 800);

	setTimeout(function () {
		// slide down signin/signup div
		signInDiv.style.marginTop = '0.1px';
		signUpDiv.style.marginTop = '0.1px';

		// clear the name, email and pass inputs
		userInput.value  = '';
		emailInput.value = '';
		passInput.value  = '';

		// set the border to .black if there were any errors
		userInputDivWrap.style.borderBottom  = 'solid #000000';
		emailInputDivWrap.style.borderBottom = 'solid #000000';
		passInputDivWrap.style.borderBottom  = 'solid #000000';

	}, 1000);

	// set states to default / clear inputs if there is any value inside
	this.setState({
		signupUsername: '',
		signupPassword: '',
		signupEmail: '',
		isvalidSignUpMail: false
	})

	// animate incons inside inputs
	userInput.style.opacity = '0';
	userInput.style.backgroundPosition = '60px';
	emailInput.style.opacity = '0';
	emailInput.style.backgroundPosition = '60px';
	passInput.style.opacity = '0';
	passInput.style.backgroundPosition = '60px';
}



signIn(e) {
	firebase.auth().signInWithEmailAndPassword(this.state.loginEmail, this.state.loginPassword)
		.then((u) => {
			console.log('Access granted.')

		let signinButton 	 = document.querySelector('.cp_signin_button'),
			signInDiv 	     = document.querySelector('.half_first_div'),
			signUpDiv 	     = document.querySelector('.half_sec_div'),
			cpUserSignIn 	 = document.querySelector('.cp_user_login'),
			forgotPassTxt 	 = document.querySelector('.cp_ul_forgotPass'),
			signinTxt 		 = document.querySelector('.signin_txt'),
			signupTxt 		 = document.querySelector('.signup_txt'),
			emailInput 		 = document.querySelector('.signin_email_input'),
			passInput 		 = document.querySelector('.signin_pass_input'),
			welcomeDiv 		 = document.querySelector('.welcome_div'),
			redBubble 		 = document.querySelector('.round'),
			roundFirst 		 = document.querySelector('.round_first'),
			roundSec 		 = document.querySelector('.round_sec'),
			cpUser 			 = document.querySelector('.cp_user'),
			chatWrapper 	 = document.querySelector('.chat_wrapper'),
			credit 	         = document.querySelector('.credit'),
			chatInsideScroll = document.querySelector('.chat_inside_scroll');

			forgotPassTxt.style.fontSize 		= '20px';
			forgotPassTxt.style.opacity  		= '0';

			emailInput.style.opacity 			= '0';
			emailInput.style.backgroundPosition = '60px';
			passInput.style.opacity  		    = '0';
			passInput.style.backgroundPosition  = '60px';

			setTimeout(function () {
				signinButton.style.top = '150px';
			}, 300);

			setTimeout(function () {
				// opacity 0 for signin div box
				cpUserSignIn.style.opacity = '0';
				// set display none for signin/signup half div
				signinTxt.style.display = 'none';
				signupTxt.style.display = 'none';
			}, 500);


			// hide signup/signin div to display signup div
			setTimeout(function () {
				cpUserSignIn.style.display = 'none';
				// signin/signup halfs user cp
				signInDiv.style.display = 'block';
				signUpDiv.style.display = 'block';
			}, 800);

			setTimeout(function () {
				// slide down signin/signup half from user cp
				signInDiv.style.marginTop = '0.1px';
				signUpDiv.style.marginTop = '0.1px';

			}, 1000);

			setTimeout(function () {
				// slide up signin/signup halfs from user cp
				signInDiv.style.marginTop   = '-250px';
				signUpDiv.style.marginTop   = '450px';
				// set transition to animate round bubble
				roundFirst.style.transition = '2s all ease-in-out';
				roundSec.style.transition   = '2s all ease-in-out';
			}, 1800);
			setTimeout(function () {
				signInDiv.style.display = 'none';
				signUpDiv.style.display = 'none';

				// change round bubble to .green (access allowed);
				roundFirst.style.backgroundColor = '#40FA27';
				roundSec.style.backgroundColor   = '#40FA27';
			}, 2200);
			setTimeout(function () {
				// welcome div box
				welcomeDiv.style.display = 'block';
			}, 2600);
			setTimeout(function () {

				welcomeDiv.style.opacity = '1';
			}, 2800);
			setTimeout(function () {
				// welcome div box
				welcomeDiv.style.opacity = '0';
				// user control panel
				cpUser.style.opacity = '0';
				// .red bubble effect
				redBubble.style.opacity = '0';

			}, 5000);
			setTimeout(function () {
				// hide control panel for user
				cpUser.style.display = 'none';
				// hide .red bubble effec
				redBubble.style.display = 'none';
				// hide welcome div box
				welcomeDiv.style.display = 'none';
				// set display block for chat
				chatWrapper.style.display = 'block';
				// scroll to bottom	
				chatInsideScroll.scrollTop = chatInsideScroll.scrollHeight + chatInsideScroll.clientHeight;

				// hide / display credits name on mobile size
				if (window.innerWidth < 500) {
					credit.style.display = 'none';
				} else {
					credit.style.display = 'block';
				}
			}, 7000);

			setTimeout(function () {
				// add transition and set opacity for chat to 1
				chatWrapper.style.transition = '2s';
				chatWrapper.style.opacity = '1';
				// scroll to bottom	
				chatInsideScroll.scrollTop = chatInsideScroll.scrollHeight + chatInsideScroll.clientHeight;
			}, 7300);
			setTimeout(function () {
				// disable transition for chat
				chatWrapper.style.transition = 'none';

			}, 10000);
		}).catch((error) => {
			console.log(error);
			if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
				// if email is invalid or email was not found, set state to true and display error msg
				this.setState({
					signin_emailErr: true
				});
				// border bottom .red alert
				document.querySelector('.cp_signin_email_input').style.borderBottom = 'solid #FF0000';
				// after 2sec, border bottom .black;
				setTimeout(function () {
					document.querySelector('.cp_signin_email_input').style.borderBottom = 'solid #000000';
				}, 2000);

			} else if (error.code === 'auth/wrong-password') {
				// if worong password, set state true, display msg/ border bottom .red/after 2 sec-> .black
				this.setState({
					signin_passErr: true
				});
				document.querySelector('.cp_signin_pass_input').style.borderBottom = 'solid #FF0000';
				setTimeout(function () {
					document.querySelector('.cp_signin_pass_input').style.borderBottom = 'solid #000000';
				}, 2000);
			}

		})
}

showHidePassSignIn(e) {
	let signup_password_input = document.querySelector('.signin_pass_input');

	signup_password_input.focus();

	// toggle icon show/hide password
	e.target.classList.toggle('hidePass_signin');
	// if input type is 'password' do..
	if (signup_password_input.type === 'password') {
		signup_password_input.type = 'text';
	} else {
		signup_password_input.type = 'password';
	}

}
signInKeyHandler(e) {
	if (e.key === 'Enter') {
		this.signIn(e);
	} else {
		return false;
	}
}
signInBack() {
	let signinButton 	   = document.querySelector('.cp_signin_button'),
		signInDiv 		   = document.querySelector('.half_first_div'),
		signUpDiv 		   = document.querySelector('.half_sec_div'),
		cpUserSignIn 	   = document.querySelector('.cp_user_login'),
		forgotPassTxt 	   = document.querySelector('.cp_ul_forgotPass'),
		signinTxt 		   = document.querySelector('.signin_txt'),
		signupTxt 		   = document.querySelector('.signup_txt'),
		emailInput 		   = document.querySelector('.signin_email_input'),
		passInput 		   = document.querySelector('.signin_pass_input'),
		signInHideShowPass = document.querySelector('.showhidepass_signin_img');

		// hide error text is there are any
	this.setState({
		signin_emailErr: false,
		signin_passErr: false,
	})
	// hide show/hide password icon
	signInHideShowPass.style.display = 'none';
	// animate the forgotpass? text
	forgotPassTxt.style.fontSize = '20px';
	forgotPassTxt.style.opacity = '0';

	// animate the user and email input icons
	emailInput.style.opacity = '0';
	emailInput.style.backgroundPosition = '60px';
	passInput.style.opacity = '0';
	passInput.style.backgroundPosition = '60px';

	setTimeout(function () {
		signinButton.style.top = '150px';
	}, 300);

	setTimeout(function () {
		cpUserSignIn.style.opacity = '0';

		signinTxt.style.display = 'block';
		signupTxt.style.display = 'block';
	}, 500);


	// hide signup/signin div to display signup div
	setTimeout(function () {
		cpUserSignIn.style.display = 'none';

		signInDiv.style.display = 'block';
		signUpDiv.style.display = 'block';
	}, 800);

	setTimeout(function () {
		signInDiv.style.marginTop = '0.1px';
		signUpDiv.style.marginTop = '0.1px';

		// clear the email and pass inputs
		emailInput.value = '';
		passInput.value = '';
	}, 1000);
}


signOut() {

	this.setState({
		openChatOptions: false
	})

	firebase.auth().signOut()
	.then(() => {
	  console.log('Signed out.')
	  window.location.reload();
	})
	.catch(error => console.log('Error: ' + error));

}

authListener() {
	// if user is logged in, set state user to user and use the data
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// if new user is added to the auth page, set the user to the actually user
			// after setstate, all info for the present user can be used 
			this.setState({
				user
			})
		} else {
			this.setState({
				user: ''
			});
		}
	});
}


componentDidMount() {
	// trigger function to check where the event mouse click is located
		// show/hide some divs when clicking outside the div
	document.addEventListener('mousedown', this.handleClickOutside);

	let chatWrapper 	= document.querySelector('.chat_wrapper'),
		self 			= this,
		cpUser 			= document.querySelector('.cp_user'),
		msgFetch 		= [],
		loadingBar  	= document.querySelector('.lds-loading'),
		round 			= document.querySelector('.round'),
		introLoadTxt 	= document.querySelector('.first_loading_text'),
		introLoadEffect = document.querySelector('.first_loading_effect'),
		credit 			= document.querySelector('.credit');


	// call function to check if user is logged in and get the user info
	this.authListener();
	// if any value, get all the values
	dataRef.on('value', gotData, errData);
	// check if there is data to fetch
	function gotData(data) {
		// the real value of data key
		let allData = data.val();
		// if there is data to retrive, retrieve
		if (allData !== null) {
			if (self.state.isScrollOnBottom) {
				setTimeout(function () {
					chatInsideScroll.scrollTop = chatInsideScroll.scrollHeight + chatInsideScroll.clientHeight;;
				}, 50);
			}

			let keys = Object.keys(allData);
			let msg, cls, key, username, imageProfile, displayOptions, dateTime;

			// hide loading bar if there is data
			loadingBar.style.display = 'none';
			// assign value for every variable
			for (let i = 0; i < keys.length; i++) {
				let k 		   = keys[i];
				key 		   = allData[k].key;
				msg 		   = allData[k].message;
				cls 		   = allData[k].className;
				username 	   = allData[k].username;
				imageProfile   = allData[k].photoURL;
				displayOptions = allData[k].displayOptions;
				dateTime 	   = allData[k].dateTime;

				// push new message/comment to array to be displayed
				msgFetch.push({
					key: 			key,
					message: 		msg,
					className: 		cls,
					username: 		username,
					photoURL: 		imageProfile,
					displayOptions: displayOptions,
					dateTime: 		dateTime
				});
			}
			// scroll to the bottom on load once
			let chatInsideScroll = document.querySelector('.chat_inside_scroll');
			if (self.state.scrollToBottomAtStart) {
				setTimeout(function () {
					chatInsideScroll.scrollTop = chatInsideScroll.scrollHeight + chatInsideScroll.clientHeight;
				}, 200);

				self.setState({
					scrollToBottomAtStart: false,
					noMsgToFetch: false
				})
			}

		} else {
			// if there is no data msg to fetch, display 'no msg' message
			self.setState({
				noMsgToFetch: true
			})
			// hide loading bar if there is data
			loadingBar.style.display = 'none';
		}


		// get only the unique values from object array
		let uniq = Array.from(new Set(msgFetch.map(a => a.key)))
			.map(key => {
				return msgFetch.find(a => a.key === key)
			});


		// if msg index number % 2 = 0, assing 'chat_msg_two' to change style on the msg box
		for (let i = 0; i < uniq.length; i++) {
			if (uniq.indexOf(uniq[i]) % 2 === 0) {
				uniq[i].className = 'chat_msg chat_msg_two';
			}
		}

		self.setState({
			msgTwo: uniq
		})

	}


	//delay 2 sec to collect user info if there is any
	//if there is no user logged in, display the cp user
	setTimeout(function () {
		// if there is no logged user, display control panel user
		if (self.state.user.displayName === undefined) {

			// hide loading text
			introLoadTxt.style.display = 'none';
			introLoadEffect.style.display = 'none';
			// display control panel for user
			cpUser.style.display = 'block';
			// display red anime bubble
			round.style.display = 'block';

			// delay to give the opacity slowly
			setTimeout(function () {
				cpUser.style.opacity = '1';
				round.style.opacity = '1';

			}, 200);

		} else {
			let chatInsideScroll = document.querySelector('.chat_inside_scroll');
			// if there is logged user, display chat
			chatWrapper.style.display = 'block';
			chatWrapper.style.transition = '1s';
			introLoadTxt.style.display = 'none';
			introLoadEffect.style.display = 'none';
			// delay to give the opacity slowly
			setTimeout(function () {
				chatWrapper.style.opacity = '1';
				chatInsideScroll.scrollTop = chatInsideScroll.scrollHeight + chatInsideScroll.clientHeight;
				// hide credits name on mobile size
				if (window.innerWidth < 500) {
					credit.style.display = 'none';
				} else {
					credit.style.display = 'block';
				}

			}, 500);

			setTimeout(function () {
				chatWrapper.style.transition = 'none';
			}, 1500);
		}

	}, 2000);


	function errData(err) {
		let errorChatMsg = document.querySelector('.error_fetch_com');
		errorChatMsg.style.display = 'none';
		console.log(err);
	}
}

componentWillUnmount() {
	// event mouse click
	document.removeEventListener('mousedown', this.handleClickOutside);
}


setWrapperRef(node) {
	// set target div to know when event click mouse is outside the div
	this.wrapperRef = node;
}

handleClickOutside(event) {
	let mapz = [...this.state.msgTwo];

	// if event click mouse is outside the div, hide msg options
	if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {

		for (let i = 0; i < mapz.length; i++) {
			if (mapz[i].displayOptions === true) {
				mapz[i].displayOptions = false;
			}
		}
		this.setState({ msgTwo: mapz })
	}
}


openSignIn() {
	let signInDiv      = document.querySelector('.half_first_div'),
		signUpDiv      = document.querySelector('.half_sec_div'),
		cpUserLogin    = document.querySelector('.cp_user_login'),
		cpSignInButton = document.querySelector('.cp_signin_button'),
		forgotPass 	   = document.querySelector('.cp_ul_forgotPass'),
		loadingBar 	   = document.querySelector('.loading_bar'),
		emailInput 	   = document.querySelector('.signin_email_input'),
		passInput 	   = document.querySelector('.signin_pass_input');


		// slide up signin/signup half div
	signInDiv.style.marginTop = '-250px';
	signUpDiv.style.marginTop = '450px';
	
	setTimeout(function () {
		// hide signup/signin div to display signup div
		signInDiv.style.display = 'none';
		signUpDiv.style.display = 'none';
		// set display block to user cp login
		cpUserLogin.style.display = 'block';
		// display the loading bar
		loadingBar.style.display = 'block';
	}, 300);
	setTimeout(function () {
		loadingBar.style.display = 'none';
		cpUserLogin.style.opacity = '1';
	}, 800);
	setTimeout(function () {
		// animate signin button
		cpSignInButton.style.top = '0';
		cpSignInButton.style.opacity = '1';
	}, 1000);
	setTimeout(function () {

		forgotPass.style.opacity = '1';
		forgotPass.style.fontSize = '14px';

	}, 1500);
	setTimeout(function () {

		emailInput.style.opacity = '1';
		emailInput.style.backgroundPosition = '5px';
		passInput.style.opacity = '1';
		passInput.style.backgroundPosition = '5px';

	}, 1700);
}

openSignUp() {
	let signInDiv 	 = document.querySelector('.half_first_div'),
		signUpDiv 	 = document.querySelector('.half_sec_div'),
		cpUserSignup = document.querySelector('.cp_user_signup'),
		signupButton = document.querySelector('.cp_button_signup'),
		loadingBar 	 = document.querySelector('.loading_bar'),
		userInput 	 = document.querySelector('.signup_username_input'),
		emailInput 	 = document.querySelector('.signup_email_input'),
		passInput 	 = document.querySelector('.signup_password_input');


	signInDiv.style.marginTop = '-250px';
	signUpDiv.style.marginTop = '450px';

	// hide signup/signin div to display signup div
	setTimeout(function () {
		loadingBar.style.display = 'block';
	}, 300);
	setTimeout(function () {
		signInDiv.style.display = 'none';
		signUpDiv.style.display = 'none';

		cpUserSignup.style.display = 'block';

	}, 500);
	setTimeout(function () {
		loadingBar.style.display = 'none';
		cpUserSignup.style.opacity = '1';
	}, 800);

	if (window.innerWidth < 500) {
		setTimeout(function () {
			signupButton.style.marginTop = '30px';
		}, 1000);
	} else {
		setTimeout(function () {
			signupButton.style.marginTop = '60px';
		}, 1000);
	}
	setTimeout(function () {
		userInput.style.opacity 		    = '1';
		userInput.style.backgroundPosition  = '5px';
		emailInput.style.opacity 		    = '1';
		emailInput.style.backgroundPosition = '5px';
		passInput.style.opacity 			= '1';
		passInput.style.backgroundPosition  = '5px';

	}, 1200);

}

openForgotPass() {
	// animate while openning forgot password box

	let signInDiv 			= document.querySelector('.half_first_div'),
		signUpDiv 			= document.querySelector('.half_sec_div'),
		forgotPassTxt 		= document.querySelector('.cp_ul_forgotPass'),
		forgotPassDiv 		= document.querySelector('.forgot_password_div'),
		cpUserSignIn 		= document.querySelector('.cp_user_login'),
		signInButton 		= document.querySelector('.cp_signin_button'),
		signinTxt 			= document.querySelector('.signin_txt'),
		signupTxt 			= document.querySelector('.signup_txt'),
		forgotPassButtonDiv = document.querySelector('.forgot_pass_butt_div'),
		emailInput 			= document.querySelector('.signin_email_input'),
		passInput 			= document.querySelector('.signin_pass_input'),
		forgotPassInput 	= document.querySelector('.input_forgot_pass');


	// animate forgot pass text 
	forgotPassTxt.style.fontSize = '20px';
	forgotPassTxt.style.opacity = '0';

	// animate input icons
	emailInput.style.opacity 			= '0';
	emailInput.style.backgroundPosition = '60px';
	passInput.style.opacity 			= '0';
	passInput.style.backgroundPosition  = '60px';

	// animate down signin button
	setTimeout(function () {
		signInButton.style.top = '150px';
	}, 200);
	// hide signin div box
	setTimeout(function () {
		cpUserSignIn.style.opacity = '0';
	}, 400);


	// hide signup/signin div to display signup div
	setTimeout(function () {
		// display none signin box div
		cpUserSignIn.style.display = 'none';

		signInDiv.style.display    = 'block';
		signUpDiv.style.display    = 'block';

		signinTxt.style.display    = 'none';
		signupTxt.style.display    = 'none';

	}, 600);

	setTimeout(function () {
		signInDiv.style.marginTop = '0.1px';
		signUpDiv.style.marginTop = '0.1px';
	}, 800);

	setTimeout(function () {
		signInDiv.style.marginTop = '-250px';
		signUpDiv.style.marginTop = '450px';
	}, 1600);
	setTimeout(function () {
		signInDiv.style.display = 'none';
		signUpDiv.style.display = 'none';

	}, 2000);

	setTimeout(function () {
		forgotPassDiv.style.display = 'block';
	}, 2300);


	setTimeout(function () {

		forgotPassDiv.style.opacity = '1';

		signinTxt.style.display = 'block';
		signupTxt.style.display = 'block';

		forgotPassButtonDiv.style.opacity = '1';
		forgotPassInput.style.opacity = '1';
		forgotPassInput.style.backgroundPosition = '5px';
	}, 2500);


}

forgotPassBack() {

	let forgotPassButtonDiv = document.querySelector('.forgot_pass_butt_div'),
		signInDiv 			= document.querySelector('.half_first_div'),
		signUpDiv 			= document.querySelector('.half_sec_div'),
		forgotInput 		= document.querySelector('.signup_password_input'),
		forgotPassDiv 		= document.querySelector('.forgot_password_div'),
		signinTxt 			= document.querySelector('.signin_txt'),
		signupTxt 			= document.querySelector('.signup_txt'),

		cpUserLogin 		= document.querySelector('.cp_user_login'),
		cpSignInButton 		= document.querySelector('.cp_signin_button'),
		forgotPass 		    = document.querySelector('.cp_ul_forgotPass'),
		loadingBar 		    = document.querySelector('.loading_bar'),

		emailInput 			= document.querySelector('.signin_email_input'),
		passInput 			= document.querySelector('.signin_pass_input'),
		forgotPassInput 	= document.querySelector('.input_forgot_pass');

	// set state to none
	this.setState({
		recoverPassword: ''
	})

	// animate icon from input
	forgotPassInput.style.opacity = '0';
	forgotPassInput.style.backgroundPosition = '60px';
	forgotPassButtonDiv.style.opacity = '0';

	setTimeout(function () {
		// clear value from forgotpass input
		forgotPassDiv.value = '';

		signinTxt.style.display = 'none';
		signupTxt.style.display = 'none';
		// signin/signup div half
		signInDiv.style.display = 'block';
		signUpDiv.style.display = 'block';
		// display loading bar
		loadingBar.style.display = 'block';

	}, 600);

	setTimeout(function () {
		// slide down signup/signin half div
		signInDiv.style.marginTop = '0.1px';
		signUpDiv.style.marginTop = '0.1px';
		// clear forgotpass input value
		forgotInput.value = '';
		// hide forgotpass div box
		forgotPassDiv.style.opacity = '0';
		forgotPassDiv.style.display = 'none';
	}, 800);

	setTimeout(function () {
		// hide loadingbar
		loadingBar.style.display = 'none';
	}, 1000);

	setTimeout(function () {
		// slide up signin/signup div half
		signInDiv.style.marginTop = '-250px';
		signUpDiv.style.marginTop = '450px';
	}, 1600);
	setTimeout(function () {
		// hide signin/signup div half
		signInDiv.style.display = 'none';
		signUpDiv.style.display = 'none';
		// display cp user div
		cpUserLogin.style.display = 'block';
	}, 2000);


	setTimeout(function () {
		// display with opacity 1 cp user div
		cpUserLogin.style.opacity = '1';
	}, 2200);
	setTimeout(function () {
		// animate signin button
		cpSignInButton.style.top = '0';
		cpSignInButton.style.opacity = '1';
	}, 2500);
	setTimeout(function () {
		// animate forgotpass text
		forgotPass.style.opacity = '1';
		forgotPass.style.fontSize = '14px';

		// animate icons from inputs
		emailInput.style.opacity = '1';
		emailInput.style.backgroundPosition = '5px';
		passInput.style.opacity = '1';
		passInput.style.backgroundPosition = '5px';

	}, 2700);

}


toggleOptionsChatMenu(e) {
	let mapz = [...this.state.msgTwo];

	for (let i = 0; i < mapz.length; i++) {
			// if displayoptions is on and msg key !== this.msg key => hide displayoptions menu
		if (mapz[i].displayOptions === true && mapz[i].key !== e.key) {
			mapz[i].displayOptions = false;
		} else if (mapz[i].key === e.key) {
					// if this.key === mapz[i].key and displayOptions menu is not on, display it
			if (mapz[i].displayOptions === false) {
				mapz[i].displayOptions = true;
			} else {
				mapz[i].displayOptions = false;

			}
		}
	}

	this.setState({
		msgTwo: mapz
	})

}
scrollToBottom(e) {

	let scroll = document.querySelector('.chat_inside_scroll');

	// if scroll is active, disable autoscroll to bottom on every new msg
	if (scroll.scrollTop > 0) {
		this.setState({
			inactiveScroll: false
		})
	}

	// if scroll view has reached the bottom, enable autoscroll down on every new msg
	if ((scroll.scrollTop + 575) >= (scroll.scrollHeight - 50)) {
		this.setState({
			isScrollOnBottom: true
		})
	} else {
		this.setState({
			isScrollOnBottom: false
		})
	}

	// is options slide menu is displayed, hide if scroll is active
	if (this.state.openChatOptions) {
		this.setState({
			openChatOptions: false
		})
	}
}

replyChatMsg(e) {
	let chatInput = document.querySelector('.chat_input');

	// set value
	chatInput.value = '@' + e.username + ' ';
	// focus on input
	chatInput.focus();
}

getMsgKey(e) {
	// get msg key when hovering above the msg before delete , and store it if the msg will be deleted
	this.setState({
		keyBeforeDelete: e.key
	})
}

chatMsgHandler(e) {
	let msgTwo = [...this.state.msgTwo];

	// toggle between display and hide dateTime on clicked msg
	for (let i = 0; i < msgTwo.length; i++) {
		// if msg key = this msg key display dateTime
		if (msgTwo[i].key === e.key) {
			if (msgTwo[i].displayDateTime) {
				msgTwo[i].displayDateTime = false;
			} else {
				msgTwo[i].displayDateTime = true;
			}
		} else if (msgTwo[i].key !== e.key) {
			if (msgTwo[i].displayDateTime) {
				msgTwo[i].displayDateTime = false;
			}
		}
	}
	// set state to display messages after filter |
	this.setState({
		msgTwo: msgTwo
	})
}


deleteChatMsg(e) {
	let msgTwo = [...this.state.msgTwo],
		selectedMsgKey = this.state.keyBeforeDelete;

	// in the messages, search for the selected key and delete it
	firebase.database().ref('messages').child(selectedMsgKey).remove()
		.then(() => {
			console.log('Message deleted successfully')
			for (let i = 0; i < msgTwo.length; i++) {
				if (msgTwo[i].key === e.key) {
					msgTwo[i].photoURL = 'https://cdn1.iconfinder.com/data/icons/material-core/18/delete-256.png';
					msgTwo[i].className = msgTwo[i].className.includes('chat_msg_two') ? 'chat_msg chat_msg_two chat_del_msg' : 'chat_msg chat_del_msg';
					msgTwo[i].message = 'This message was deleted';
				}

			}

			this.setState({
				msgTwo: msgTwo
			})
		})
		.catch((err) => console.log('Something went wrong while deleting the selected message'))

}

insideInputHandler() {
	// close 'leave chat' if displayed
	if (this.state.openChatOptions) {
		this.setState({
			openChatOptions: false
		})
	}
	// hide emoji list when clicking inside the input
	if (this.state.openEmojiList) {
		this.setState({
			openEmojiList: false
		})
	}
}

insideChatHandler() {
	// close 'leave chat' if displayed
	if (this.state.openChatOptions) {
		this.setState({
			openChatOptions: false
		})
	}

	// hide emoji list when clicking inside the chat
	if (this.state.openEmojiList) {
		this.setState({
			openEmojiList: false
		})
	}
}

openChatOptions() {
	// open chat options menu
	this.setState(prevState => ({
		openChatOptions: !prevState.openChatOptions
	}));
}

openEmojiList() {
	// open / close emoji list
	this.setState(prevState => ({
		openEmojiList: !prevState.openEmojiList
	}));

	// close sign out option if displayed
	if (this.state.openChatOptions) {
		this.setState({
			openChatOptions: false
		})
	}
}


selectEmoji(e) {
	let chatInput = document.querySelector('.chat_input'),
		chatArrowButton = document.querySelector('.send_msg_arrow');
	
	if (this.state.inputMsg) {
		// if inside input  chat is already value, put emoji after text
		this.setState({
			inputMsg: this.state.inputMsg + e.code
		})

		chatInput.value = this.state.inputMsg + e.code;
		chatInput.focus();
	} else {
		this.setState({
			inputMsg: e.code
		})
		// set value to chat input
		chatInput.value = e.code;
		// focus on chat input after selecting emoji
		chatInput.focus();
		// make available the send arrow button
		chatArrowButton.style.opacity = '1';

	}
}


renderMsg() {
    return this.state.msgTwo.map((item,index) =>

		<div key={index} id='chat_msg' className={item.className} onClick={(e) => this.chatMsgHandler(item)}>

			<div className='avatarAndname col-12'>
				<div className='row'>
					<div className='col-10'>
						<div className='row'>
							<div className='avatar_msg'>
								<div className='row justify-content-center'>
									<img alt='profile' src={item.photoURL}/>
								</div>
							</div>
									<span className='user_name'>{item.username}</span>
						</div>
					</div>

			<div className='col-2'>
				<div className='options_div' onClick={(e) => this.toggleOptionsChatMenu(item)} ref={this.setWrapperRef}>
					 		<span className='vert_ellipsis'>&#8942;</span>
				 
								<div className='row justify-content-center'>
									<div className='wrap_options_div col-12'>
										{item.displayOptions ? (
											<div className='options_menu' ref={this.setWrapperRef}>
												<div className='row justify-content-center'>
													<span className='reply_button' onClick={(e) => this.replyChatMsg(item)}>Reply</span>
												</div>

													{this.state.user.displayName === item.username ? (
														<div className='row justify-content-center'>
															<span className='delete_button' 
															onClick={(e) => this.deleteChatMsg(item)}
														    onMouseOver={(e) => this.getMsgKey(item)}>
														    Delete
														    </span>
														</div>
													) : ('')}
											</div>
										) : ('')}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

					<div className='chat_msg_txt col-12'>
							<div className='row'>
								{item.message}
							</div>
					</div>

					{item.displayDateTime ? (
					<div className='show_datetime col-12'>
						<div className='row float-right'>
							{item.dateTime}
						</div>
					</div>
					) : ('')
				}
		</div>

	)
 }


signupErrorMsg() {
	
	if(this.state.signup_emailBadFormat) {
		return 'Invalid email address';
	} else if(this.state.signup_emailInUse) {
		return 'Email is already in use';
	} else if(this.state.signup_badPassword) {
		return 'Invalid password';
	} 
}



render() {
	return (
		<div>
			<div className='container_prin container-fluid'>
				<div className='row justify-content-center'>

					<div className='inside_container col-12'>
						<div className='row justify-content-center'>
					 		
					 		<div className='first_loading_text'>
					 			Loading
					 			<span className='first_load_dot'>.</span>
					 			<span className='sec_load_dot'>.</span>
					 			<span className='third_load_dot'>.</span>
					 		</div>

					 		<div className='first_loading_effect'>
					 			<span className='one_loading_effect'></span>
					 			<span className='two_loading_effect'></span>
					 			<span className='three_loading_effect'></span>
					 			<span className='four_loading_effect'></span>
					 			<span className='five_loading_effect'></span>
					 			<span className='six_loading_effect'></span>
					 		</div>

							<div className='round'>
								<span className='round_first'></span>
								<span className='round_sec'></span>
							</div>
						
							<div className='cp_user '>
								<div className='row justify-content-center'>
									<div className='loading_bar col-12'>
											<div className='row justify-content-center'>
											<div className="lds-dual-ring"></div>
											</div>
									</div>
							</div>

							<div className='half_div_wrapper'>
								<div className='row justify-content-center'>
									<div className='hfirst_cp half_first_div col-12'>
										<div className='row justify-content-center'>
												<p className='signin_txt'
												 onClick={() => this.openSignIn()}>
												 SIGN IN
												 </p>
										</div>
									 
									</div>
									<div className='hfirst_cp half_sec_div col-12'>
										<div className='row justify-content-center'>
												<p className='signup_txt' 
												onClick={() => this.openSignUp()}>
												SIGN UP</p>
										</div>
									</div>
								</div>
							</div>
							
					{/*  Sign in div  */}
		 
					<div className='cp_user_login col-12'>
						<div className='row justify-content-center'>
							<div className='login_back col-12 bg-warning' onClick={() => this.signInBack()}>
								<div className='row justify-content-center'>
									Back
								</div>
							</div>
						</div>

						<div className='login_email_div'>

							<div className='row justify-content-center'>
								<div className='cp_signin_email col-12 mt-2'>
									<div className='row justify-content-center'>
										Email
									</div>
								</div>
							</div>

							<div className='row justify-content-center'>
								<div className='cp_user_email_input col-12'>
									<div className='row justify-content-center'>
										<div className='cp_signin_email_input col-8'>
											<div className='row justify-content-center'>
												<input type='text' className='signin_email_input col-12' autocomplete="off" 
												onChange={(e) => this.loginEmailHandler(e)}
												onKeyPress={(e) => this.signInKeyHandler(e)}></input>
											</div>
										</div>
									</div>
								</div>
							</div>
							{this.state.signin_emailErr ? (
							<div className='col-12 mt-2'>
								<div className='row justify-content-center'>
									<p className='signin_email_error_msg'>Invalid email</p>
								</div>
							</div>
							) : ('')}

						</div>

						<div className='row justify-content-center'>
							<div className='cp_signin_pass col-12 mt-4'>
								<div className='row justify-content-center'>
									Password
								</div>
							</div>
						</div>


						<div className='row justify-content-center'>
							<div className='col-12'>
								<div className='row justify-content-center'>
									<div className='cp_signin_pass_input col-8'>
										<div className='row justify-content-center'>
											<input type='password' className='signin_pass_input col-10' 
											autocomplete='off'
											onChange={(e) => this.loginPasswordHandler(e)}
											onKeyPress={(e) => this.signInKeyHandler(e)}></input>

											<div className='showhidepass_signin_div col-2'>
												<div className='row justify-content-center'>
													<span className='showhidepass_signin_img' onClick={(e) => this.showHidePassSignIn(e)}></span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{this.state.signin_passErr ? (
							<div className='col-12 mt-2'>
								<div className='row justify-content-center'>
									<p className='signin_password_error_msg'>Invalid password</p>
								</div>
							</div>
						) : ('')
						}

						<div className='logAndForgot'>
							<div className='row justify-content-center'>
								<div className='cp_signin_button cp_signin_loginButton col-5 col-sm-5 col-md-6 mt-3 bg-warning' 
									onClick={(e) => this.signIn(e)}>
										<div className='row justify-content-center'>
											Sign in
										</div>
								</div>
							</div>

							<div className='row justify-content-center'>
									<div className='col-12'>
										<div className='row justify-content-center'>
										<span className='cp_ul_forgotPass' onClick={() => this.openForgotPass()}>Forgot password?</span>
										</div>
									</div>
							</div>
						</div>
					</div>
							 
					{/* end of cp_user_login */}

					{/*  Sign up user */}

						<div className='cp_user_signup col-12'>
							<div className='row justify-content-center'>
								<div className='signup_back col-12 bg-warning' onClick={() => this.signUpBack()}>
									<div className='row justify-content-center'>
										Back
									</div>
								</div>
							</div>

							<div className='cp_user_signup_username'>
								<div className='row justify-content-center'>
									<div className='cp_username_signup col-12 mt-3'>
										<div className='row justify-content-center'>
											Username
										</div>
									</div>
								</div>

								<div className='row justify-content-center'>
									<div className='col-12'>
										<div className='row justify-content-center'>
											<div className='cp_signup_username_input col-8'>
													<div className='row justify-content-center'>
														<input type='text' className='signup_username_input col-12'
														autocomplete='off'
														onChange={(e) => this.usernameSignupHandler(e)}
														onKeyPress={(e) => this.signUpKeyHandler(e)}></input>
													</div>
											</div>
										</div>
									</div>
								</div>
							</div>	

							<div className='row justify-content-center'>
								<div className='cp_email_signup col-12 mt-2'>
									<div className='row justify-content-center'>
										Email address
									</div>
								</div>
							</div>

							<div className='row justify-content-center'>
								<div className='col-12'>
									<div className='row justify-content-center'>
										<div className='cp_signup_email_input col-8'>
											<div className='row justify-content-center'>
												<input type='text' className='signup_email_input col-12' 
												autocomplete='off'
												onChange={(e) => this.emailSignupHandler(e)}
												onKeyPress={(e) => this.signUpKeyHandler(e)}></input>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className='row justify-content-center'>
									<div className='cp_password_signup col-12 mt-2'>
										<div className='row justify-content-center'>
											Password
										</div>
									</div>
							</div>

							<div className='row justify-content-center'>
								<div className='col-12'>
									<div className='row justify-content-center'>
										<div className='cp_signup_password_input col-8'>
											<div className='row'>
												<input type='password' className='signup_password_input col-10' 
												autocomplete='off'
												onChange={(e) => this.passwordSignupHandler(e)}
												onKeyPress={(e) => this.signUpKeyHandler(e)}></input>
												<div className='showhidepass_signupDiv col-2'>
													<div className='row justify-content-center'>
														<span className='showHidePass_signupImg' onClick={(e) => this.signUpShowHidePass(e)}></span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className='row justify-content-center'>
							 	<p className='signup_error_msg'>{this.signupErrorMsg()}</p>
							</div>

							<div className='row justify-content-center'>
								<div className='cp_button_signup col-5 col-sm-5 col-md-6 bg-warning' onClick={(e) => this.signUp(e)}>
									<div className='row justify-content-center'>
										Signup
									</div>
								</div>
							</div>
						</div>

						<div className='forgot_password_div col-12'>
							<div className='row justify-content-center'>
								<div className='forgotpass_back col-12 bg-warning' onClick={() => this.forgotPassBack()}>
									<div className='row justify-content-center'>
										Back
									</div>
								</div>

									<div className='ent_email_addr_txt col-12'>
										<div className='row justify-content-center'>
											<div className='forgot_pass_txt col-10'>
												Please enter your email address. <br />
												You will receive a link to create a new password.
											</div>
										</div>
									</div>

									<div className='forgot_input_div_col col-12'>
										<div className='row justify-content-center'>
											<div className='forgot_pass_input_div col-8'>
												<div className='row justify-content-center'>
													<input type='text' autocomplete='off' className='col-12 input_forgot_pass' placeholder='Enter address here' onChange={(e) => this.forgotPassHandler(e)}></input>
												</div>
											</div>
										</div>
									</div>


				 					<div className='forgot_pass_butt_div col-12'>
				 						<div className='row justify-content-center'>
				 							<div className='forgot_pass_butt col-5 bg-warning' onClick={(e) => this.sendNewPassword(e)}>
				 								Send
				 							</div>
				 						</div>
				 					</div>
							</div>
						</div>

						<div className='welcome_div col-12'>
							<div className='row justify-content-center'>
								<p className='welcome_txt'>Welcome!</p>
							</div>
							<div className='row justify-content-center'>
							{this.state.user.displayName ? (
								<p className='welcome_username'>{this.state.user.displayName}</p>
								) : ('')
							}
							</div>
							<div className='row justify-content-center'>
								<p className='letschat'>Let's chat!</p>
							</div>
							<div className='row justify-content-center'>
								<span className='welcome_img'></span>
							</div>
						</div>

					</div>
				
					{/* end of cp_user */}
					
						{/* ---------------------- CHAT MENU -------------------- */}

						<div className='chat_wrapper col-12 col-sm-11 col-md-9 col-lg-5 col-xl-5'>

							<div className='row'>
								<div className='top_div col-12'>
									<div className='row'>
										<span className='ellipsis_chat' onClick={() => this.openChatOptions()}>&#8942;</span>
											<p className='signedas_txt'>Signed as <span className='user_displayname'>{this.state.user.displayName ? this.state.user.displayName : 'No user'}</span></p>
									</div>
								</div>
							</div>

							{this.state.openChatOptions ? (
							<div className='row'>
								<div className='slide_menu col-3 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
										<div className='row justify-content-center'>
										<p onClick={() => this.signOut()}>Leave chat</p>
									</div>
								</div>
							</div>
							) : ('') }
							<div className='row justify-content-center'>	
								<div className='chat_wrap col-12 col-sm-11 col-md-11 col-lg-11 col-xl-11'>
									<div className='row justify-content-center'>
										<div className='chat_inside'>
											<div className='row justify-content-center'>
												<div className='chat_inside_scroll' id='chat_inside_scroll' onClick={() => this.insideChatHandler()} onScroll={(e) => this.scrollToBottom(e)}>
													<div className='row justify-content-center'>
														<div className="lds-loading"><div></div><div></div><div></div></div>
															</div>
																<div className='row justify-content-center'>
																	<p className='error_fetch_com'>There was a problem trying loading the data :(</p>
																		</div>
																			<div className='row justify-content-center'>
																				{this.state.noMsgToFetch ? (
																				<p className='no_msg_tofetch'>There is no data to fetch</p>
																					) : ('')}
																					</div>
																						<div className='row justify-content-center'>
																								{this.renderMsg()}
																						</div>
																						</div>

																				{/* -------- EMOTICONS LIST --------- */}
																						{this.state.openEmojiList ? (
																							<div className='emoji_list col-6 col-sm-5 col-md-5 col-xl-4'>

																								<div className='row justify-content-center'>
																									<div className='emoji_first_row col-12'>
																										<div className='row justify-content-center'>
																										{this.state.emojiFirstRowIcons.map((item,index) =>
																										 <span id='emoji_icon' 
																										 key={item.code}
																										 className={item.className}
																										 onClick={(e) => this.selectEmoji(item)}></span>
																										)}
																										</div>
																									</div>
																								</div>

																								<div className='row justify-content-center'>
																									<div className='emoji_sec_row col-12'>
																										<div className='row justify-content-center'>
																										{this.state.emojiSecRowIcons.map((item,index) =>
																										 <span id='emoji_icon' 
																										  key={item.code}
																										 className={item.className}
																										 onClick={(e) => this.selectEmoji(item)}></span>
																										)}
																										</div>
																									</div>
																								</div>

																							</div> 
																								
																						) : ('')}	

																							{this.state.openEmojiList ? (
																								<div className='emoji_list_wave col-6 col-sm-5 col-md-5 col-xl-4'>
																									<div className='row justify-content-center'>
																									</div>
																								</div>
																								) : ('') }
																				{/* --- end of emoji_list --- */}
																						 

																					</div>
																				</div>

									</div>
								</div>
								<div className='input_wrapper col-12'>
									<div className='row'>

													<div className='chat_input_div col-10  col-sm-10 col-md-10 col-lg-10 col-xl-10'>
														<div className='row'>

															<div className='emoji_button_div col-2 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
																<div className='row justify-content-center'>
																<span id='emoji_button' className='emoji_button_icon' onClick={() => this.openEmojiList()}></span>
																</div>
															</div>

															<input className='chat_input col-10 col-sm-11 col-md-11 col-lg-11 col-xl-11' 
																autocomplete='off'
																placeholder='Type a message' 
																onClick={() => this.insideInputHandler()}
																onChange={(e) => this.chatInputHandler(e)} 
																onKeyPress={(e) => this.msgInputKeyHandler(e)}>
															</input>

															

														</div>
													</div>

													<div className='send_arrow_div col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
														<div className='row justify-content-center'>
															<span className='send_msg_arrow' onClick={() => this.submitForm()}></span>
														</div>
													</div>

									</div>
								</div>
							</div>
						</div>
						<div className='credit col-12'>
							<div className='row'>
								@2019 - <span className='credit_name'><a href='https://www.linkedin.com/in/stan-ionut-1193a0159/'> Ionut Stan</a></span>
							</div>
						</div>

						</div>
					</div>
				</div>
			</div>
		</div>
		)
	}
}

export default LiveChat;