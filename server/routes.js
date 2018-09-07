import express from 'express';
import path from 'path';

const routes = express.Router();

//Homepage
routes.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + './../static/home.html'));
});

//Fetch all questions
routes.get('/questions', (req, res) => {
	res.sendFile(path.join(__dirname + './../static/home.html'));
});

//Fetch a question
routes.get('/:id([0-9]{1,})', (req, res) => {
	res.sendFile(path.join(__dirname + './../static/question.html'));
});

//Fetch a question
routes.get('/questions/:id([0-9]{1,})', (req, res) => {
	res.redirect('/'+req.params.id);
});

//Signup
routes.get('/signup', (req, res) => {
	res.sendFile(path.join(__dirname + './../static/signup.html'));
});

routes.post('/signup', (req, res) => {
	if(res.status === 200) {
		res.redirect('/');
	}
});


//Signin
routes.get('/signin', (req, res) => {
	res.sendFile(path.join(__dirname + './../static/signin.html'));
});

routes.post('/signin', (req, res) => {
	if(res.status === 200) {
		res.redirect('/');
	}
});

//logout
routes.get('/logout', (req, res) => {
	if(res.status === 200) {
		res.redirect('/');
	}
});

export default routes;
