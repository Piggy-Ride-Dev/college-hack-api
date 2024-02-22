/**
 * @swagger
 * components:
 *   schemas:
 *     ProcessingFileStatus:
 *       type: string
 *       enum: [pending, processing, completed, failed]
 *     SectionStatus:
 *       type: string
 *       enum: [active, completed, dropped, failed]
 *     Schedule:
 *       type: object
 *       properties:
 *         day:
 *           type: string
 *         time:
 *           type: string
 *           format: date-time
 *         location:
 *           type: string
 *     Section:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         code:
 *           type: string
 *         courseID:
 *           type: string
 *         teacherID:
 *           type: string
 *         status:
 *           $ref: '#/components/schemas/SectionStatus'
 *         schedules:
 *           type: object
 *           properties:
 *             lecture:
 *               $ref: '#/components/schemas/Schedule'
 *             lab:
 *               $ref: '#/components/schemas/Schedule'
 *             office:
 *               $ref: '#/components/schemas/Schedule'
 *         processingFileStatus:
 *           $ref: '#/components/schemas/ProcessingFileStatus'
 *         files:
 *           type: array
 *           items:
 *             type: string
 *     Semester:
 *       type: object
 *       properties:
 *         userID:
 *           type: string
 *         courses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Section'
 *         number:
 *           type: integer
 *         year:
 *           type: integer
 *         start:
 *           type: string
 *           format: date-time
 *         end:
 *           type: string
 *           format: date-time
 *
 * /semesters/:
 *   get:
 *     summary: Get list of semesters for the user
 *     tags: [Semesters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of semesters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Semester'
 *   post:
 *     summary: Create a new semester
 *     tags: [Semesters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Semester'
 *     responses:
 *       200:
 *         description: Semester created successfully
 *
 * /semesters/{id}:
 *   get:
 *     summary: Get a specific semester by ID
 *     tags: [Semesters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed information about the semester
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Semester'
 *   patch:
 *     summary: Update a specific semester
 *     tags: [Semesters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Semester'
 *     responses:
 *       200:
 *         description: Semester updated successfully
 *
 * /semesters/{id}/upload-files:
 *   post:
 *     summary: Upload files to a specific semester
 *     tags: [Semesters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the semester to which the files are being uploaded
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: The files to upload
 *           encoding:
 *             files:
 *               contentType: 'application/octet-stream'
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Files uploaded successfully
 *                 urls:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: https://example.com/file/path
 *       400:
 *         description: Bad request if the file upload fails
 *       401:
 *         description: Unauthorized if the user is not authenticated
 */