# CS 260 Notes

[My startup](https://startup.wordduhle.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 35.173.23.85 (It's my Elastic IP address)
I did it right the first time but still ended up having to create a whole new server because I ended up installing stuff wrong later on.

## Caddy

Literally just followed the instructions and it wasn't that hard. Even didn't have to switch it because of my elastic IP address. [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React. Honestly this was already written but it pretty much follows how I felt about the html part

## CSS

Honestly this was the hardest thing so far because of all the flex and grid formatting. I also didn't help myself by picking wordle which is really hard to format correctly grid-wise while making it look good. I ended up using pretty basic stuff for the login but my Bootstrap buttons look pretty cool in my navbar.

```html
      <nav className="nav-body">
            <img id="logo-head" src="/word-duh-le_logo.png" alt="Word-duh-le logo"/>
            <menu className="nav nav-pills">
                <li className="nav-item">
                        <NavLink className="nav-link" to="">
                              Login
                          </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="play">
                        Play
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="leaderboard">
                        Leaderboard
                    </NavLink>
                </li>
            </menu>
        </nav>
```

If I'm being honest I had AI make me some images and I just editted them to what I wanted them to be. Then I just inserted them as a little logo in the top left corner.

```html
<img id="logo-head" src="/word-duh-le_logo.png" alt="Word-duh-le logo"/>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS and so I had to change some of my CSS. I also ended up tweeking some of my CSS because it looked a little different than I wanted after all the switching to React components instead of html pages. The assignment wasn't incredibly hard because of the walkthrough we did in class but it still took some time to personalize all the final touches. 

## React Part 2: Reactivity

I have seen the face of the Almighty. This was... a very large learning experience with an even larger learning curve. In the end I was able to complete it to the best of my ability (using a lot of help of course) and have learn a bunch of things. Moral of the story is that the useState is pretty cool and the fact that useEffect can re-render the page is really nice. I never had a problem with manipulating the DOM directly because my page would break if I tried, so there's that I guess.

Handling the Wordle mechanics along with keeping the webpage instact was definitely a struggle but we did it in the end. We definitely had to make some massive changes and do a lot of style changes but it turned out better in the end.

These are all the React states I had to keep in the global level just so everything could communicate to each other.
```jsx
const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
const [authState, setAuthState] = React.useState(currentAuthState);
const [scores, setScores] = React.useState([
      { player: "Joshua", score: 2 },
      { player: "Alex", score: 3 },
      { player: "Sam", score: 4 },
    ]);
const [recentScore, setRecentScore] = React.useState(null);
```
