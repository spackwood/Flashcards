const express = require("express");
const router = express.Router();

const FlashCard = require("../../models/FlashCard");

router.get("/all", (req, res) => {
    FlashCard.find()
        .sort({ rank: 1 })
        .then(todo => res.json(todo));
});

router.post("/add", (req, res) => {
    const newFlash = new FlashCard({
        question: req.body.question,
        answer: req.body.answer
    });
    newFlash
        .save()
        .then(flash => res.json(flash))
        .catch(err => console.log(err));
});

    router.patch("/rank/:id", (req, res) => {
        FlashCard.updateOne({ _id: req.params.id }, { $set: req.body })
            .then(card => res.json({ statue: true, card }))
            .catch(err => res.json({ statue: false, err }));
    });

    router.patch("/toggle/:id", (req, res) => {
        FlashCard.findById(req.params.id).then(card => {
            card.toggle = !card.toggle;
            card.save().then(() => res.json({ success: true }));
        });
    });

    router.delete("/delete/:id", (req, res) => {
        FlashCard.deleteOne({ _id: req.params.id })
            .then(card => res.json({ statue: true, card }))
            .catch(err => res.json({ statue: false, err }));
    });

    module.exports = router;