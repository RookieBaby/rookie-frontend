import authorize from './middleware/authorize'
import loginController from './controller/loginController'
import logoutController from './controller/logoutController'
import registerController from './controller/registerController'
import articleController from './controller/articleController'
import commentController from './controller/commentController'

export default (app) => {
  // GET / 首页重定向
  app.get('/', (req, res) => {
    res.redirect('/articles')
  })

  // GET /login 登录页
  app.get('/login', authorize.isNotLogin, loginController.renderLoginPage)

  // POST /login 用户登录
  app.post('/login', authorize.isNotLogin, loginController.login)

  // GET /logout 登出
  app.get('/logout', authorize.isLogin, logoutController.logout)

  // GET /register 注册页
  app.get('/register', authorize.isNotLogin, registerController.renderRegisterPage)

  // POST /register 用户注册
  app.post('/register', authorize.isNotLogin, registerController.createUser)

  // GET /articles 所有用户或者特定用户的文章页
  // eg: GET /articles?author=xxx
  app.get('/articles', articleController.getAllArticles)

  // GET /articles/create 发表文章页
  app.get('/articles/create', authorize.isLogin, articleController.renderCreateArticlePage)

  // POST /articles 发表一篇文章
  app.post('/articles', authorize.isLogin, articleController.createArticle)

  // GET /articles/:articleId 单独一篇的文章页
  app.get('/articles/:articleId', articleController.getOneArticle)

  // GET /articles/:articleId/edit 更新文章页
  app.get('/articles/:articleId/edit', authorize.isLogin, articleController.editArticlePage)

  // POST /articles/:articleId/edit 更新一篇文章
  app.post('/articles/:articleId/edit', authorize.isLogin, articleController.editArticle)

  // GET /articles/:articleId/remove 删除一篇文章
  app.get('/articles/:articleId/remove', authorize.isLogin, articleController.deleteArticle)

  // POST /articles/:articleId/comment 创建一条留言
  app.post('/articles/:articleId/comment', authorize.isLogin, commentController.createComment)

  // GET /articles/:articleId/comment/:commentId/remove 删除一条留言
  app.get('/articles/:articleId/comment/:commentId/remove', authorize.isLogin, commentController.deleteComment)

  // 404 page
  app.use((req, res) => {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}

// express.router().get 和 app.get .post
