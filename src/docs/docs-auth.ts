/**
 * @swagger
 * components:
 *   schemas:
 *     AuthResponseData:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *         cookie:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *             userId:
 *               type: string
 *             isFirstAccess:
 *               type: boolean
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: college-hack-data
 *
 * /auth/google:
 *   get:
 *     summary: Redirect to authentication URL
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Redirect to external authentication service URL.
 *
 * /auth/google/callback:
 *   get:
 *     summary: Callback endpoint for authentication service to redirect to after user is authenticated
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code returned by the authentication service
 *     responses:
 *       200:
 *         description: User successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponseData'
 *       400:
 *         description: Error during authentication
 *
 * /auth/token:
 *   get:
 *     summary: Retrieve authentication token and user data stored in cookie
 *     tags:
 *       - Authentication
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Authentication data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 isFirstAccess:
 *                   type: boolean
 *       401:
 *         description: User is not authenticated
 */
