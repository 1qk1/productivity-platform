const BoardList = require("../models/boardList");

const moveToSameList = (req, res) => {
  const { fromList: listId, cardId, toIndex } = req.body;
  BoardList.findById(listId).then(list => {
    const cardIndex = list.cards.findIndex(
      card => card._id.toString() === cardId
    );
    const card = list.cards[cardIndex];
    list.cards.splice(cardIndex, 1);
    list.cards.splice(toIndex, 0, card);
    list
      .save()
      .then(() => res.sendStatus(200))
      .catch(res.handleError);
  });
};

const moveToAnotherList = (req, res) => {
  const { fromList, toList, cardId, toIndex } = req.body;
  BoardList.find({
    _id: { $in: [fromList, toList] }
  }).then(foundLists => {
    const [from, to] =
      foundLists[0]._id.toString() === fromList
        ? [foundLists[0], foundLists[1]]
        : [foundLists[1], foundLists[0]];
    console.log(from, to, "from, to");
    const cardIndex = from.cards.findIndex(
      card => card._id.toString() === cardId
    );
    console.log(cardIndex, "cardIndex");
    const card = from.cards[cardIndex];
    console.log(card, "card");
    from.cards.splice(cardIndex, 1);
    to.cards.splice(toIndex, 0, card);
    console.log(from, "from");
    console.log(to, "to");
    console.log("=============================");
    Promise.all([from.save(), to.save()])
      .then(() => res.sendStatus(200))
      .catch(res.handleError);
  });
};

module.exports = {
  moveToSameList,
  moveToAnotherList
};
