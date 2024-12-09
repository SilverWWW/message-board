# [The Daily You](https://will-silver-message-board.vercel.app) #

## Overview ##

This project is a comprehensive messaging board application designed to facilitate community interaction and communication. Users can register, create profiles, and engage in discussions through posting messages in a global thread. 

The project was created using [React](https://react.dev/) and implements features provided by [Supabase](https://supabase.com/) and [API Ninjas](https://api-ninjas.com/).

Here are some of the key user-facing features the app provides:

* <b>User authentication</b>: Using the Supabase authentication API, users can securely create and log into accounts. Users are prompted to create a username under which they can post messages. User sessions persist on a device until they log out.

* <b>Posting messages</b>: Once logged in, users can post messages to a global message board via a user-friendly homepage containing a text input form.

* <b>Editing and deleting messages:</b> After posting a message, users have the option to edit or delete said message.

* <b>Real-time user messaging</b>: Multiple users with the app open at the same time can see live messages being posted, edited, and deleted.

* <b>Content moderation</b>: All sent and edited messages are put through a profanity filter provided by API Ninjas and censored if they contain inflammatory content. Also, users may report messages posted by other users which are flagged for later review. Lastly, messages are required to be between 1 and 128 characters.

* <b>Hosting</b>: This web app is currently being hosted through [Vercel](https://vercel.com/). Feel free to log in and leave a message!

## How to Use the App ##

Simply navigate to [this link](https://will-silver-message-board.vercel.app) to begin using TDY. <i>Note that the app will not function correctly if run on a local environment, as it depends on the correct ```.env``` configurations.</i>

## In-Depth Overview of Component Structure ##

#### ```MessageBoard``` ####
A message board is a component that displays all the previous messages as a [```MessageList```](#messagelist) and allows users to input new messages via a [```NewMessageForm```](#newmessageform). This component manages all the interactions with the database in methods such as ```fetchMessages```, ```sendMessage```, ```deleteMessage```, ```updateMessage```, and ```reportMessage```. Additionally, in this component, we subscribe to all changes in the ```messages``` table in the database so that any update is immediately reflected.

#### ```NewMessageForm``` ####
A new message form is where users enter and send text to become new messages. It contains a text area that reflects the text entered by users and a send button that handles sending the entered message to the message board. Also, it optionally displays errors depending on if invalid messages are sent.

#### ```MessageList``` ####
A message list is effectively just a parent container that holds and organizes a set of [```Messages```](#message) from most to least recent. It employs a useState to ensure that only one [```MessageKebabMenu```](#messagekebabmenu) can be open at a time.

#### ```Message``` ####
A message is a bundle of information pertaining to a given message sent by a user. It contains the user's display name, the time the message was sent, a [```MessageKebabMenu```](#messagekebabmenu) with options to interact with the message, and the message text itself. This component contains the majority of the logic for editing a message.

#### ```MessageKebabMenu``` ####
Contained inside a [```Message```](#message), a message kebab menu is a short list of options offered to the user depending on who the message was sent by. If the user sent the message, the menu lets them edit or delete the message, otherwise, it lets them report it.

#### ```AuthContext``` and ```PrivateRoute``` ####
An auth context is a wrapper component that wraps around the entirety of the exported app. Effectively, it allows tracking of the current user state across every sub-component of the app. The private route component wraps around the message board component and is a way of automatically redirecting the user to the login home if they become signed out at any time.

#### ```LoginHome```, ```SignIn```, and ```SignUp``` ####
By default, if they are not signed in, users are redirected to the login home page where they have the option to sign in and get redirected to the sign in page. Here, users can enter an email and password that, upon submission, will be passed to Supabase's sign in method provided by their authentication API. Alternatively, users may redirect to the sign up page where they can enter the necessary fields to sign up which, again, is handled by Supabase's authentication API.

#### ```Footer``` ####
The footer, which is viewable on all pages, displays whether the user is signed in or not. If they are, it will display their unique username as well as a button to sign out at any time.

#### ```GeneralMessageFilter``` ####
The general message filter is a simple component that, given a string of text, makes an API call to API Ninja's profanity filter API and returns a censored version of the given text.

## Database Setup ##

The database for this web app (hosted by Supabase) is relatively simple. There are two key tables: ```users``` and ```messages```.

The ```users``` table contains the following columns:
* ```id``` (UID) (PK): uniquely identifies users.
* ```email``` (varchar): tracks user emails.
* ```name``` (varchar): tracks user display names.

The ```messages``` table contains the following columns:
* ```id``` (int128) (PK): uniquely identifies messages.
* ```created_at``` (timestamptz): tracks when messages were sent.
* ```posted_by``` (UID) (FK): identifies which user posted the message.
* ```content``` (varchar): stores the text content of the message.
* ```reported``` (bool): tracks whether a message has been reported or not.








