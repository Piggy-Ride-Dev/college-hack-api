/**
 * @swagger
 * components:
 *   schemas:
 *     College:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the college
 *         name:
 *           type: string
 *           description: Name of the college
 *     Program:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the program
 *         name:
 *           type: string
 *           description: Name of the program
 *         collegeID:
 *           type: string
 *           description: Identifier of the college offering the program
 *         code:
 *           type: string
 *           description: Unique code of the program
 *         numOfSemesters:
 *           type: integer
 *           format: int32
 *           description: Number of semesters in the program
 *         college:
 *           $ref: '#/components/schemas/College'
 *           description: Detailed information about the college offering the program
 *
 * /institution:
 *   get:
 *     summary: Retrieve a list of programs and their associated colleges
 *     tags:
 *       - Institution
 *     responses:
 *       200:
 *         description: A list of programs with detailed information about their associated colleges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Program'
 *       401:
 *         description: Unauthorized if API key is missing or invalid
 *       500:
 *         description: Internal Server Error
 */
