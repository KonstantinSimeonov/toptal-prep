Obviously, the contraints are stated badly - the **length** of the string cannot be larger than **2 * 10 ^ 5**.

Here's a stab at an explanation for anyone who feels lost. Let's consider the formula breakdown of the cases below:

<br>
| number | substrings                                                                                   | formula                          |
|:------:|---------------------------------------------------------------------------------------------:|:--------------------------------:|
| ab     | ab<br>a<br>b                                                                                 | 11a + 2b                         |
| abc    | abc<br>ab<br>bc<br>a<br>b<br>c                                                               | 111a + 22b + 3c                  |
| abcd   | abcd<br>abc<br>bcd<br>ab<br>bc<br>cd<br>a<br>b<br>c<br>d                                     | 1111a + 222b + 33c + 4d          |
| abcde   | abcde<br>abcd<br>bcde<br>abc<br>bcd<br>cde<br>ab<br>bc<br>cd<br>de<br>a<br>b<br>c<br>d<br>e | 11111a + 2222b + 333c + 44d + 5e |

<br>
This simplifies things a bit - the first digit is always multiplied by some number with 1s, the second with 2s, etc. I didn't find any convenient way to calculate the numbers by which the digits are multiplied, because the calculation gets slow for large inputs. Let's have a look at how the formulas could be expressed in a different (more implementation-friendly) way:

<br>
| number | formula                          | implementation-friendly formula                                                   |
|:------:|---------------------------------:|:---------------------------------------------------------------------------------:|
| ab     | 11a + 2b                         | 10a + a + 2b                                                                      |
| abc    | 111a + 22b + 3c                  | 10(10a + a + 2b) + a + 2b + 3c                                                    |
| abcd   | 1111a + 222b + 33c + 4d          | 10(10(10a + a + 2b) + a + 2b + 3c) + a + 2b + 3c + 4d                             |
| abcde  | 11111a + 2222b + 333c + 44d + 5e | 10(10(10(10a + a + 2b) + a + 2b + 3c) + a + 2b + 3c + 4d) + a + 2b + 3c + 4d + 5e |

<br>
Looking at `abcde`, notice how in the innermost brackets we add `a + 2b`, then `a + 2b + 3c`, then `a + 2b + 3c + 4d` and finally `a + 2b + 3c + 4d + 5e`. Those look a lot like partial sums, but every digit is multiplied by its position (from left to right, 0-based) plus one. Also, you can notice how each case builds on the previous one by first multiplying by **10** and then adding a partial sum with a new component (let's look at how `abc` extends `ab`):

<br>
```
SUMS(abc) = 10(SUMS(ab)) + PARTIAL_SUMS(ab) + 3c
SUMS(abcd) = 10(SUMS(abcd)) + PARTIAL_SUMS(abcd) + 4d
```

So we need to keep track of the sums and partial sums up to now. Let's look at `abc`:

<br>
```
partial_sums = 0
sums = 0
index = 0

sums = 10 * 0 = 0
partial_sums = 1a // input[index] * (index + 1)
sums = a // add partial_sums

index = 1
sums = 10a
partial_sums = a + 2b
sums = 10a + a + 2b = 11a + 2b

index = 2
sums = 110a + 20b // * 10
partial_sums = a + 2b + 3c
sums = 110a + 20b + a + 2b + 3c = 111a + 22b + 3c
```

Since all the necessary operations are addition and multiplication, the modulo can easily be applied when adding to/multiplying **sums** and when adding to **partial_sums**. Since only two variables of memory are necessary, the space complexity of this approach is `O(1)`, while the time complexity is `O(length(input))`.
