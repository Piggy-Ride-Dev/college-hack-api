/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         name:
 *           type: string
 *           description: The user's first name
 *         lastname:
 *           type: string
 *           description: The user's last name
 *         picture:
 *           type: string
 *           description: URL to the user's picture
 *         googleId:
 *           type: string
 *           description: The user's Google ID
 *         email:
 *           type: string
 *           description: The user's email address
 *         college:
 *           type: string
 *           description: The user's college
 *         program:
 *           type: string
 *           description: The user's program
 *     UserCreate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *         googleId:
 *           type: string
 *         picture:
 *           type: string
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         college:
 *           type: string
 *         program:
 *           type: string
 *         picture:
 *           type: string
 *
 * /user/:
 *   get:
 *     summary: Retrieve current user's information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized access
 *   patch:
 *     summary: Update current user's information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Successfully updated the user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request due to invalid input data
 *       401:
 *         description: Unauthorized access
 */
