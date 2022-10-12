const express = require('express');

const router = express.Router();

// Element for apiDoc
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../helpers/apiDoc');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const {
  userController, announcementController, logController, requestController, devTeamController,
} = require('../controllers');
const controllerHandler = require('../helpers/controllerHandler');

// Middleware who verify token
const authenticateJWT = require('../middlewares/jwtAuth');

// Element for data validation
const validation = require('../validation/validator');
const schemaSignIn = require('../validation/schemas/signIn');
const schemaLogin = require('../validation/schemas/login');
const schemaUser = require('../validation/schemas/user');
const schemaAnnouncement = require('../validation/schemas/announcement');
const schemaUserId = require('../validation/schemas/userId');

router.route('/')
  .get((req, res) => { res.redirect('/api-docs'); });

/**
 * @openapi
 * /sign_in:
 *    post:
 *      summary: Create a user account
 *      tags: [user]
 *      produces:
 *          - application/json
 *      requestBody:
 *        content:
 *          'application/json':
 *            schema:
 *              properties:
 *                teamName:
 *                  description: User's team name
 *                  type: string
 *                mail:
 *                  description: User's email
 *                  type: string
 *                password:
 *                  description: User's password
 *                  type: string
 *                passwordConfirm:
 *                  description: User's password
 *                  type: string
 *                picture:
 *                  description: User's picture link
 *                  type: string
 *                description:
 *                  description: User's picture link
 *                  type: string
 *                field:
 *                  description: User's field
 *                  type: string
 *                level:
 *                  description: User's level
 *                  type: string
 *                category:
 *                  description: User's category
 *                  type: string
 *                coachName:
 *                  description: User's coach name
 *                  type: string
 *                phone:
 *                  description: User's phone number
 *                  type: string
 *                city:
 *                  description: User's city
 *                  type: string
 *                postalCode:
 *                  description: User's postal code
 *                  type: string
 *              required:
 *                - teamName
 *                - mail
 *                - password
 *                - passwordConfirm
 *                - postalCode
 *                - phone
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
// Create a new user //?SQL insert_user
router.route('/sign_in')
  .post(validation('body', schemaSignIn), controllerHandler(logController.sign_in));

/**
 * @openapi
 * /login:
 *    post:
 *      summary: Log an existing user and get his infos
 *      tags: [user]
 *      produces:
 *          - application/json
 *      requestBody:
 *        content:
 *          'application/json':
 *            schema:
 *              properties:
 *                mail:
 *                  description: User's email
 *                  type: string
 *                password:
 *                  description: User's password
 *                  type: string
 *              required:
 *                - mail
 *                - password
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
// Log an existing user //?SQL read_user_connected
router.route('/login')
  .post(validation('body', schemaLogin), controllerHandler(logController.login));

/**
 * @openapi
 * /user/{id}:
 *    get:
 *      summary: Get user informations
 *      tags: [user]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: User id
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */

/**
 * @openapi
 * /user/{id}:
 *    post:
 *      summary: Update a user account
 *      tags: [user]
 *      produces:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          description: User id
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *        content:
 *          'application/json':
 *            schema:
 *              properties:
 *                teamName:
 *                  description: User's team name
 *                  type: string
 *                picture:
 *                  description: User's path picture
 *                  type: string
 *                description:
 *                  description: User's description
 *                  type: string
 *                field:
 *                  description: User's field
 *                  type: string
 *                level:
 *                  description: User's level
 *                  type: string
 *                category:
 *                  description: User's category
 *                  type: string
 *                coachName:
 *                  description: User's coach name
 *                  type: string
 *                mail:
 *                  description: User's mail
 *                  type: string
 *                phone:
 *                  description: User's path phone
 *                  type: string
 *                postalCode:
 *                  description: User's postal code
 *                  type: string
 *                city:
 *                  description: User's city
 *                  type: string
 *                password:
 *                  description: User's password
 *                  type: string
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
// Get one user informations //?SQL read_user
router.route('/user/:id')
  .get(authenticateJWT, controllerHandler(userController.getUserById))
  .post(validation('body', schemaUser), authenticateJWT, controllerHandler(userController.userUpdate));

/**
 * @openapi
 * /delete_user:
 *    delete:
 *      summary: Delete a user account
 *      tags: [user]
 *      produces:
 *          - application/json
 *      requestBody:
 *        content:
 *          'application/json':
 *            schema:
 *              properties:
 *                id:
 *                  description: User's id
 *                  type: integer
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
// Delete one user //?SQL delete_user
router.route('/delete_user')
  .delete(validation('body', schemaUser), authenticateJWT, controllerHandler(userController.deleteUser));

/**
 * @openapi
 * /user_announcement/{id}:
 *    get:
 *      summary: Get user announcements
 *      tags: [announcement]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: User id
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */

/**
 * @openapi
 * /user_announcement/{id}:
 *    post:
 *      summary: Create a user announcement
 *      tags: [announcement]
 *      produces:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          description: User id
 *          schema:
 *            type: integer
 *          required: true
 *      requestBody:
 *        content:
 *          'application/json':
 *            schema:
 *              properties:
 *                date:
 *                  description: Game day, YYYY-MM-DD
 *                  type: string
 *                description:
 *                  description: Game day, YYYY-MM-DD
 *                  type: string
 *                level:
 *                  description: User's level
 *                  type: string
 *                place:
 *                  description: Match location dom / ext
 *                  type: string
 *                field:
 *                  description: Few words to describe the announcement
 *                  type: string
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
// Get all announcements of one user //?SQL read_announcement (user_id)
// Create a new announcement //?SQL insert_announcement
router.route('/user_announcement/:id')
  .get(authenticateJWT, controllerHandler(announcementController.getUserAnnouncements))
  .post(validation('body', schemaAnnouncement), authenticateJWT, controllerHandler(announcementController.postAnnouncement));

/**
 * @openapi
 * /delete_announcement:
 *    delete:
 *      summary: Delete a user's announcement
 *      tags: [announcement]
 *      produces:
 *          - application/json
 *      requestBody:
 *        content:
 *          'application/json':
 *            schema:
 *              properties:
 *                id:
 *                  description: Announcement's id
 *                  type: integer
 *                  required: true
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
// Delete one announcement //?SQL delete_announcement
router.route('/delete_announcement')
  .delete(validation('body', schemaAnnouncement), authenticateJWT, controllerHandler(announcementController.deleteAnnouncement));

/**
 * @openapi
 * /search_announcements/{research}:
 *    get:
 *      summary: Get announcements by filters
 *      tags: [announcement]
 *      parameters:
 *        - in: path
 *          name: research
 *          description: Research parameters dep+date+level+place+category
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
// Get all announcements using filters //?SQL read_filtered_announcements
router.route('/search_announcements/:research')
  .get(controllerHandler(announcementController.searchAnnouncements));

/**
 * @openapi
 * /new_request:
 *    post:
 *      summary: Post a request by a user on an other user's announcement
 *      tags: [request]
 *      produces:
 *          - application/json
 *      requestBody:
 *        content:
 *          'application/json':
 *            schema:
 *              properties:
 *                userId:
 *                  description: User's id (the one who generate the request)
 *                  type: integer
 *                  required: true
 *                announcementId:
 *                 description: Announcement's id
 *                 type: integer
 *                 required: true
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
router.route('/new_request')
  .post(authenticateJWT, controllerHandler(requestController.createRequest));

/**
 * @openapi
 * /request_received/{id}:
 *    get:
 *      summary: Get requests received on user's announcement
 *      tags: [request]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: User's id
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
// Get request issued by a an other user on user announcement //?SQL read_request_received
router.route('/request_received/:id')
  .get(validation('query', schemaUserId), authenticateJWT, controllerHandler(requestController.getRequestReceived));

/**
 * @openapi
 * /request_sended/{id}:
 *    get:
 *      summary: Get requests sended by a user
 *      tags: [request]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: User's id
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
// Get request issued by user on an other user announcement //?SQL read_request_sended
router.route('/request_sended/:id')
  .get(validation('query', schemaUserId), authenticateJWT, controllerHandler(requestController.getRequestSended));

/**
 * @openapi
 * /change_request_status:
 *    post:
 *      summary: Accept or reject a request
 *      tags: [request]
 *      produces:
 *          - application/json
 *      requestBody:
 *        content:
 *          'application/json':
 *            schema:
 *              properties:
 *                id:
 *                  description: Request's id
 *                  type: integer
 *                  required: true
 *                requestStatus:
 *                  description: accepted / rejected
 *                  type: string
 *                  required: true
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
// Change request status (and announcement status if necessary)
router.route('/change_request_status')
  .post(authenticateJWT, controllerHandler(requestController.validateRequest));

/**
 * @openapi
 * /delete_request:
 *    delete:
 *      summary: Delete a request
 *      tags: [request]
 *      produces:
 *          - application/json
 *      requestBody:
 *        content:
 *          'application/json':
 *            schema:
 *              properties:
 *                id:
 *                  description: Request's id
 *                  type: integer
 *                  required: true
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
// Delete request //?SQL delete_request
router.route('/delete_request')
  .delete(authenticateJWT, controllerHandler(requestController.deleteRequest));

/**
 * @openapi
 * /dev_team:
 *    get:
 *      summary: Get development team info
 *      tags: [dev_team]
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
// Get dev_team //?SQL read_dev_team
router.route('/dev_team')
  .get(controllerHandler(devTeamController.getDevTeam));

/**
 * @openapi
 * /contact/{id}:
 *    get:
 *      summary: Contact the team on his profile page
 *      tags: [mail]
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 *
 */
router.route('/contact/:id').get(controllerHandler(userController.contactUser));

module.exports = router;
