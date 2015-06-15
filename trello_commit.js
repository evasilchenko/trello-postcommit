var Trello = require("node-trello");
var t = new Trello("<key>", "<token>"); // Change these to your key and token from Trello

var exec = require('child_process').exec;

exec('(cd ' + process.argv[2] + ' && git log -1 --oneline HEAD)', function callback(error, stdout, stderr){
  if (error) throw error;

  if(stdout.indexOf('|') < 0) { return;  }

  var splitCommit = stdout.split('|'),
      cardIdentifier = splitCommit[1].trim(),
      commitContent = 'Commit: ' + splitCommit[0],
      postUrl = "/1/cards/{0}/actions/comments/",
      getUrl,
      splitString,
      cardId,
      boardId;

  if(cardIdentifier && cardIdentifier.indexOf('trello.com') >= 0) {
    splitString = cardIdentifier.split('/');
    cardId = splitString[splitString.length - 1].replace('\n','');

    postUrl = postUrl.replace('{0}', cardId);

    t.post(postUrl, { text: commitContent }, function (error, data) {
      if (error) throw error;
      console.log('Sent commit message to Trello');
    });
  }
  else {
    getUrl = "/1/boards/{0}/cards/{1}";

    splitString = cardIdentifier.split('/');
    boardId = splitString[0];
    cardId = splitString[1].replace('\n', '');

    getUrl = getUrl.replace('{0}', boardId).replace('{1}', cardId);

    t.get(getUrl, function (error, data) {
      if (error) throw error;
      postUrl = postUrl.replace('{0}', data.id);

      t.post(postUrl, { text: commitContent }, function (error, data) {
        if (error) throw error;
        console.log('Sent commit message to Trello');
      });
    });
  }


});
