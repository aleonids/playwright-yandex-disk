#!/bin/bash
CYAN='\033[0;36m'
NO_COLOR='\033[0m'

# Get environment variables
is_yandex_disk_tests=$YANDEX_DISK_TESTS
is_yandex_disk_tests_critical=$YANDEX_DISK_TESTS_CRITICAL

# Check if at least one specific test is configured
specific_tests=("$is_yandex_disk_tests" "$is_yandex_disk_tests_critical")
has_specific_tests=$([[ "${specific_tests[*]}" =~ "true" ]] && echo "true" || echo "false")

# Literal variables
tests_path="tests"
yandex_disk_tests="yandexDisk"
allure_index="--reporter=list,allure-playwright"
retry="--retries=2"
critical_tests="@critical"
test_allure_results="test-allure-results"

function information_message {
  echo -e "${CYAN}<---- ${1^^} ---->${NO_COLOR}"
}

function error_check {
  if [ $? -ne 0 ]; then
    echo -e "${RED}<---- ${1^^} ---->${NO_COLOR}"
    exit 1
  fi
}

# clearing previous report
sh scripts/clear-report.sh

# Go to test folder
cd "${tests_path}" || error_check "Couldn't open ${tests_path} folder"

# Run specific tests if configured
if [[ "$has_specific_tests" == "true" ]]; then
  information_message "Starting specified tests"

  if [[ "$is_yandex_disk_tests" == "true" ]]; then
    npm run "$test_allure_results" "$yandex_disk_tests" -- "$retry" "$allure_index"
  fi

  if [[ "$is_yandex_disk_tests_critical" == "true" ]]; then
    npm run "$test_allure_results" "$yandex_disk_tests" -- "$retry" "$allure_index" --grep "$critical_tests"
  fi

  # Generate allure report
  if [[ "$is_yandex_disk_tests" == "true" || "$is_yandex_disk_tests_critical" == "true" ]]; then
    npx allure generate ../allure-results -o ../allure-report --clean
  fi

# Otherwise run all the other tests
else
  information_message "Starting all tests"
  npm run "$test_allure_results" -- "$retry" "$allure_index"
fi
