import "../css/Message.css";
import moment from 'moment';

function Message({message, timestamp, username}) {


    return (
        <div className="message">
            <div className="message-header">
                <span className="message-username">Posted by <b>{username}</b></span>
                <span className="message-timestamp"> 
                    <i>{moment(timestamp).fromNow()} </i>
                </span>
                </div>
                
                <div className="message-body">{message}</div>
          </div>
    );

}

export default Message;