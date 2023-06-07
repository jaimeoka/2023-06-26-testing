set -e

git checkout main

branches=(
  main
  solution-01-e2e-basics
  starter-02-e2e-advanced solution-02-e2e-advanced
  starter-03-component-integration-tests solution-03-component-integration-tests
  starter-04-unit-tests-async-mock solution-04-unit-tests-async-mock solution-04-unit-tests-async-mock-inject
  starter-05-rxjs solution-05-rxjs
  starter-06-component-integration-tests-fallback solution-06-component-integration-tests-fallback
  starter-07-visual-regression solution-07-visual-regression
)

for branch in ${branches[*]}; do
  git checkout $branch
  git push $1 $branch
done

git checkout main
