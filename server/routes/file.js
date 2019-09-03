const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  console.log("api file route");
  return res.send('api file route')
});

router.post('/', async (req, res, next) => { // Sign up
  try {
    const newFile = await db.File.create({
      content: JSON.stringify(req.body.content),
      name: req.body.name,
      parentId: 0, //req.body.parentId,
      UserId: req.body.userId
    });
    console.log(newFile);
    return res.status(200).json(newFile);
  } catch (e) {
    console.error(e);
    // TODO: error handler
    return next(e);
  }
});

// request body parameters: userId, fileId, content
// response body parameters: entriesUpdated
router.put('/', async (req, res, next) => {
	try {
		// Get old file content from DB 
		const oldContent = await db.File.findOne({
			where: { id: req.body.fileId
			}
		});
		
		// Insert old content into Revisions
		const revisionInsert = await db.Revision.create({
			  content: oldContent.content,
			  name: oldContent.name,
			  UserId: req.body.userId,
			  fileId: req.body.fileId
			});
		
		// Insert New Content into Files
		const newFile = await db.File.update(
		{content: req.body.content}, 
		{where: {Id: req.body.fileId}});

		return res.status(200).json({'entriesUpdated': newFile[0]});
	} catch (e) {
		console.error(e);
		return next(e);
	}
}); 

module.exports = router;
