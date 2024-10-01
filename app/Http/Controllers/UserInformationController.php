<?php

namespace App\Http\Controllers;

use App\Models\UserInformation;
use Illuminate\Http\Request;

class UserInformationController extends Controller
{
    // Display a listing of the user information
    public function index()
    {
        $userInformation = UserInformation::all();
        return response()->json($userInformation);
    }

    // Show the form for creating a new user information
    public function create()
    {
        return view('user_information.create');
    }

    // Store a newly created user information in storage
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'email_address' => 'required|email|max:255',
            'user_id' => 'required|integer', // Ensure user_id is required
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $input = $request->except('profile_picture');
        if ($request->hasFile('profile_picture')) {
            $input['profile_picture'] = $request->profile_picture->store('projects/profile_picture', 'public');
        }
        $existingUserInformation = UserInformation::where('user_id', $request->user_id)->first();
        if ($existingUserInformation) {
            $existingUserInformation->update($input);
            return response()->json($existingUserInformation, 201);
        }
        $userInformation = UserInformation::create($input);
        return response()->json($userInformation, 201);
    }
    


    // Display the specified user information
    public function show($id)
    {
        $userInformation = UserInformation::findOrFail($id);
        return response()->json($userInformation);
    }

    // Show the form for editing the specified user information
    public function edit($id)
    {
        $userInformation = UserInformation::findOrFail($id);
        return view('user_information.edit', compact('userInformation'));
    }

    // Update the specified user information in storage
    public function update(Request $request, $id)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'email_address' => 'required|email|max:255',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $input = $request->except('profile_picture');
        if ($request->hasFile('profile_picture')) {
            $input['profile_picture'] = $request->profile_picture->store('projects/profile_picture', 'public');
        }

        $userInformation = UserInformation::findOrFail($id);
        $userInformation->update($input);
        return response()->json($userInformation);
    }

    // Remove the specified user information from storage
    public function destroy($id)
    {
        $userInformation = UserInformation::findOrFail($id);
        $userInformation->delete();
        return response()->json(null, 204);
    }
}
