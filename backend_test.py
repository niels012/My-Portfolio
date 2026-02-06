#!/usr/bin/env python3
"""
Backend API Testing for Portfolio Contact Form
Tests the contact submission API endpoints
"""

import requests
import json
from datetime import datetime
import sys

# Backend URL from environment
BACKEND_URL = "https://nilour-portfolio-v2.preview.emergentagent.com/api"

def test_create_contact_submission():
    """Test POST /api/contact - Create a contact submission"""
    print("Testing POST /api/contact - Create contact submission")
    
    # Realistic test data for portfolio contact form
    test_data = {
        "name": "Sarah Johnson",
        "email": "sarah.johnson@company.com", 
        "subject": "Web Design Project Inquiry",
        "message": "Hi Nilo, I'm interested in discussing a website redesign for my startup. We're looking for a modern, clean design that reflects our innovative approach to sustainable technology. Could we schedule a call to discuss the project scope and timeline?"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=test_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 201:
            response_data = response.json()
            # Verify response structure
            required_fields = ['id', 'name', 'email', 'subject', 'message', 'created_at', 'is_read']
            for field in required_fields:
                if field not in response_data:
                    print(f"❌ ERROR: Missing field '{field}' in response")
                    return None
            
            # Verify data matches input
            if (response_data['name'] == test_data['name'] and 
                response_data['email'] == test_data['email'] and
                response_data['subject'] == test_data['subject'] and
                response_data['message'] == test_data['message'] and
                response_data['is_read'] == False):
                print("✅ POST /api/contact - SUCCESS")
                return response_data['id']
            else:
                print("❌ ERROR: Response data doesn't match input data")
                return None
        else:
            print(f"❌ ERROR: Expected status 201, got {response.status_code}")
            return None
            
    except Exception as e:
        print(f"❌ ERROR: Failed to create contact submission - {str(e)}")
        return None


def test_get_contact_submissions():
    """Test GET /api/contact - List all contact submissions"""
    print("\nTesting GET /api/contact - List contact submissions")
    
    try:
        response = requests.get(f"{BACKEND_URL}/contact")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            
            if isinstance(response_data, list):
                print(f"Retrieved {len(response_data)} submissions")
                
                if len(response_data) > 0:
                    # Check if sorted by created_at (newest first)
                    if len(response_data) > 1:
                        first_date = datetime.fromisoformat(response_data[0]['created_at'].replace('Z', '+00:00'))
                        second_date = datetime.fromisoformat(response_data[1]['created_at'].replace('Z', '+00:00'))
                        if first_date >= second_date:
                            print("✅ Submissions correctly sorted by created_at (newest first)")
                        else:
                            print("❌ ERROR: Submissions not properly sorted")
                    
                    # Verify structure of first submission
                    submission = response_data[0]
                    required_fields = ['id', 'name', 'email', 'subject', 'message', 'created_at', 'is_read']
                    for field in required_fields:
                        if field not in submission:
                            print(f"❌ ERROR: Missing field '{field}' in submission")
                            return False
                
                print("✅ GET /api/contact - SUCCESS")
                return True
            else:
                print("❌ ERROR: Response should be a list")
                return False
                
        else:
            print(f"❌ ERROR: Expected status 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: Failed to get contact submissions - {str(e)}")
        return False


def test_mark_submission_read(submission_id):
    """Test PATCH /api/contact/{id}/read - Mark submission as read"""
    print(f"\nTesting PATCH /api/contact/{submission_id}/read - Mark submission as read")
    
    if not submission_id:
        print("❌ ERROR: No submission ID available for testing")
        return False
    
    try:
        response = requests.patch(f"{BACKEND_URL}/contact/{submission_id}/read")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            response_data = response.json()
            if 'message' in response_data:
                print("✅ PATCH /api/contact/{id}/read - SUCCESS")
                return True
            else:
                print("❌ ERROR: Expected success message in response")
                return False
        else:
            print(f"❌ ERROR: Expected status 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: Failed to mark submission as read - {str(e)}")
        return False


def test_mark_nonexistent_submission():
    """Test PATCH with non-existent ID to verify error handling"""
    print("\nTesting PATCH /api/contact/nonexistent/read - Error handling")
    
    try:
        response = requests.patch(f"{BACKEND_URL}/contact/nonexistent-id/read")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 404:
            print("✅ Error handling for non-existent submission - SUCCESS")
            return True
        else:
            print(f"❌ ERROR: Expected status 404 for non-existent submission, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: Failed to test error handling - {str(e)}")
        return False


def main():
    """Run all backend tests"""
    print("=== Backend API Tests for Portfolio Contact Form ===")
    print(f"Backend URL: {BACKEND_URL}")
    print()
    
    # Test 1: Create contact submission
    submission_id = test_create_contact_submission()
    
    # Test 2: Get all contact submissions
    get_success = test_get_contact_submissions()
    
    # Test 3: Mark submission as read (if we have an ID)
    mark_success = test_mark_submission_read(submission_id)
    
    # Test 4: Error handling for non-existent submission
    error_handling_success = test_mark_nonexistent_submission()
    
    # Summary
    print("\n=== Test Summary ===")
    print(f"POST /api/contact: {'✅ PASS' if submission_id else '❌ FAIL'}")
    print(f"GET /api/contact: {'✅ PASS' if get_success else '❌ FAIL'}")
    print(f"PATCH /api/contact/{{id}}/read: {'✅ PASS' if mark_success else '❌ FAIL'}")
    print(f"Error handling: {'✅ PASS' if error_handling_success else '❌ FAIL'}")
    
    all_passed = submission_id and get_success and mark_success and error_handling_success
    print(f"\nOverall Result: {'✅ ALL TESTS PASSED' if all_passed else '❌ SOME TESTS FAILED'}")
    
    return all_passed


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)