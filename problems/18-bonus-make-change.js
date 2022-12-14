/***********************************************************************
Write a recursive function that will find the best way to make change from a
given set of coin values for a given amount of money. The set of coin values
should default to using pennies (1 cent), nickels (5 cents), dimes (10 cents),
and quarters (25 cents). Return `null` if there are no possible ways to make
change for the given target amount.

Examples:

makeChange(21); // [1, 10, 10]
makeChange(75); // [25, 25, 25]
makeChange(33, [15, 3]); // [3, 15, 15]
makeChange(34, [15, 3]); // null
makeChange(24, [10, 7, 1]) // [7, 7, 10]

Here's a game plan for solving the problem:

First, write a 'greedy' version called `greedyMakeChange`:

Take as many of the biggest coin as possible and add them to your result.
Add to the result by recursively calling your method on the remaining amount,
leaving out the biggest coin, until the remainder is zero.
Once you have a working greedy version, talk with your partner about refactoring
this to `makeBetterChange`. What's wrong with `greedyMakeChange`?

Consider the case of `greedyMakeChange(24, [10,7,1])`. Because it takes as many
10 pieces as possible, `greedyMakeChange` misses the correct answer of
`[10,7,7]` (try it in node).

To `makeBetterChange`, we only take one coin at a time and never rule out
denominations that we've already used. This allows each coin to be available
each time we get a new remainder. By iterating over the denominations and
continuing to search for the best change, we assure that we test for
'non-greedy' uses of each denomination.

Discuss the following game plan and then work together to implement your
new method:

- Iterate over each coin.
- Grab only one of that one coin and recursively call `makeBetterChange` on the
  remainder using coins less than or equal to the current coin.
- Add the single coin to the change returned by the recursive call. This will be
  a possible solution, but maybe not the best one.
- Keep track of the best solution and return it at the end.

N.B. Don't generate every possible permutation of coins and then compare them.
Remember that a permutation is not the same thing as a combination - we will
need to check every combination of coins that add up to our target, we just
don't want to check the same combination in different orders. If you get stuck
you can start by writing a solution that calculates and compares all of the
permutations without storing them in an array. Then go back and refactor your
solution so that it only calculates and compares all of the different
combinations.
***********************************************************************/

//Laugh wan kill me sha, I don't even know where to begin on this one, I'll have to come back to this entire problems folder to try and figure this out cos damn!!!!!!!!!!!!!!!!!!
function greedyMakeChange(target, coins = [25, 10, 5, 1]) {
  // no tests for greedyMakeChange so make sure to test this on your own
  // your code here
  let change = [];
  const unchecked = coins.slice(1);
  let remainder;

  if (coins.length === 0) {
    return change;
  }

  const coin1 = coins[0];
  const times = Math.floor(target / coin1);

  if (times < 1) {
    change.push(...greedyMakeChange(target, unchecked));
  } else if (times === 1){
    remainder = Math.floor(target - coin1);
    change.push(coin1, ...greedyMakeChange(remainder, unchecked));
  } else {
    remainder = target - (coin1 * times);
    change = Array(times).fill(coin1);
    change.push(...greedyMakeChange(remainder, unchecked));
  }

  if (!change) {
    return null;
  }

  return change;
}

// Solution : go through this later
function makeBetterChange(target, coins = [25, 10, 5, 1]) {
  // your code here
  if (target === 0) {
    return [0, []];
  }

  if (coins.length === 0 && target > 0) {
    return [Infinity, []];
  }

  if (coins[0] > target) {
    return makeBetterChange(target, coins.slice(1));
  } else {
    let loseIt = makeBetterChange(target, coins.slice(1));  // just one call of change
    let useIt = makeBetterChange(target - coins[0], coins); // just one call of change
    if (loseIt[0] < 1 + useIt[0]) {
        return loseIt;
    } else {
        return [1 + useIt[0], useIt[1].concat(coins[0])];
    }
  }
}




/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = makeBetterChange
} catch (e) {
  module.exports = null;
}
