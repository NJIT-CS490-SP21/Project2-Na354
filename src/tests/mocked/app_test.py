import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../'))
from app import add_user, DB
import models

from models import define_user_class
KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = 'user1'

class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 'Robyn',
                KEY_EXPECTED: [INITIAL_USERNAME, 'Robyn'],
            },
            ]
        Person = models.define_user_class(DB)
        initial_person = models.Person(username=INITIAL_USERNAME, rank = 100, wins = 0)
        self.initial_db_mock = []
    
    
    def mocked_db_session_add(self, username):
        self.inital_db_mock.append(username)    
    
    
    def test_success(self):
        for test in self.success_test_params:
            with patch('APP.DB.session.add', self.mocked_db_session_add):
                actual_result = add_user(test[KEY_INPUT])
                expected_result = test[KEY_EXPECTED]
                self.assertEqual(len(actual_result), len(expected_result))
                self.assertEqual(actual_result[1], expected_result[1])