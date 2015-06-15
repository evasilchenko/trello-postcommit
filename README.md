# trello-postcommit 
Automatically create comments on Trello, after a new git commit in bitbucket. Please note that this was created originally a couple of years ago to tackle the lack of a true broker integration between bitbucket and Trello. The original ticket that this attempts to tackle can be found here:
 - https://bitbucket.org/site/master/issue/6186/add-broker-for-trello-bb-7347

## Installation Stage 1

1. Clone the repo
2. Put the package.json and trello_commit.js files in the same folder anywhere in your file system (or leave them in the repo)
3. Run npm install in the location of the trello and package.json files to get the dependencies
4. Change the key and token at the top of the trello_commit.js file to your specific ones (replace <key> and <token>)

### Generating Trello Key and Token

- Visit the following url in your browser to generate the key:
 - https://trello.com/1/appKey/generate

- After you get the key visit the following url in your browser to get the token:
 - https://trello.com/1/connect?key=<key>&name=PostCommit&expiration=never&response_type=token&scope=read,write (replace the <key> with your key)

## Installation Stage 2

1. Modify the post-commit file's directory changes (cd) to point to where trello_commit.js is located
2. Drop the post-commit file into any or all of your repo's .git/hooks folder


# How to Commit to Trello (2 Different Ways)

In order for your commit message to automatically be posted to a Trello card, you will have to know that card's id. The current trello_commit supports two types of ids, the boardId/shortId or the shortLink. Just open up the card in your browser and take a look at the url.

## Example 1 (The last two parts are the boardId/shortId):
https://trello.com/card/name-of-card/5193b0b45b9811b7240036bf/68
So your commit would look like this:

````bash
git commit -m "My comment message | 5193b0b45b9811b7240036bf/68"
````

The second way to post a commit message to Trello is to get the shortLink of the card. You can do it by opening the card and finding the More.. link. Clicking the More... link will show a popup that will have a field called Link to this card and a shortened url. If you just copy that url you can do a commit with that link instead of the first method.

## Example 2
````bash
git commit -m "My comment message | https://trello.com/c/4Xdt2A6d" (Make sure to include the entire link)
````

