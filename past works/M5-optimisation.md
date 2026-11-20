# M5 Optimisation

## Function Optimised
validateContactForm()

## Critique Received
The AI said the function handled several tasks and that repeated
document.getElementById() calls made it visually dense.

## What I Applied
I moved the five form-element lookups outside the function.
This lets the function reuse the same elements on every submission.

## Observed Improvement
The function contains five fewer lookup statements.
The five elements are found once when the script loads instead
of again on every submission. No speed difference was measured.

## What I Rejected
I kept the validation steps together instead of splitting them
into more functions because the four-field form is easier for
me to follow in one place.

## Verification
Record the results of the empty and valid submissions here.