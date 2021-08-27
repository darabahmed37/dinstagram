import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import Post from "./CustomComponents/Post";
import { auth, db } from "./firebase";
import InstagramEmbed from "react-instagram-embed";
import {
  Button,
  Input,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import ImageUpload from "./CustomComponents/ImageUpload";

const App = () => {
  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(undefined);
  const [openSign, setOpenSign] = useState(0);

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const [modalStyle] = React.useState(getModalStyle);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
      authUser.user
        .updateProfile({ displayName: userName })

        .then(() => {})
        .catch((e) => alert(e.message));
    });
    // alert(user.displayName);
    setOpen(false);
  };
  const classes = useStyles();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((Authuser) => {
      if (Authuser !== null) {
        setUser(auth);
        console.log(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, userName]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setPost(
          snapshot.docs.map((document) => ({
            post: document.data(),
            id: document.id,
          }))
        );
      });
  }, []);

  return (
    <div className={"app"}>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className={"app__signup"}>
            <center>
              <img src={logo} alt="Instagram Logo" />
            </center>

            <Input
              placeholder={"User Name"}
              type={"text"}
              value={userName}
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              placeholder={"Email"}
              type={"email"}
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder={"Password"}
              type={"password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={signUp} type={"submit"}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSign} onClose={() => setOpenSign(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className={"app__signup"}>
            <center>
              <img src={logo} alt="Instagram Logo" />
            </center>

            <Input
              placeholder={"Email"}
              type={"email"}
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder={"Password"}
              type={"password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              onClick={(e) => {
                e.preventDefault();
                auth
                  .signInWithEmailAndPassword(email, password)
                  .catch((e) => alert(e.message));
                setOpenSign(false);
              }}
              type={"submit"}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img src={logo} alt="Instagram Logo" />
        {user ? (
          <Button
            onClick={() => {
              auth.signOut();
              setUser(null);
            }}
          >
            Log Out
          </Button>
        ) : (
          <div className={"login__container"}>
            <Button onClick={() => setOpenSign(true)}>Sign IN</Button>
            <Button onClick={() => setOpen(true)}>Sign UP</Button>
          </div>
        )}
      </div>
      <div className={"app__post"}>
        {" "}
        {post.map((post) => (
          <Post key={post.id} {...post.post} />
        ))}
      </div>
      <InstagramEmbed
          url='https://instagr.am/p/Zw9o4/'
          clientAccessToken='123|456'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {
          }}
          onSuccess={() => {
          }}
          onAfterRender={() => {
          }}
          onFailure={() => {
          }}
      />

      {user ? (
        <ImageUpload userName={user?.currentUser.displayName} />
      ) : (
        <Typography variant={"h6"} color={"error"}>
          Sorry!!!! Login to Upload and Spam Not Allowed
        </Typography>
      )}
    </div>
  );
};

export default App;