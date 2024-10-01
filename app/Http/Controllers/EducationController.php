<?php

namespace App\Http\Controllers;

use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    // Display a listing of the educations
    public function index()
    {
        $educations = Education::all();
        return response()->json($educations);
    }

    // Show the form for creating a new education
    public function create()
    {
        return view('educations.create');
    }

    // Store a newly created education in storage
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'user_id' => 'required|integer',
        ]);

        $education = Education::create($validated);
        return response()->json($education, 201);
    }

    // Display the specified education
    public function show($id)
    {
        $education = Education::findOrFail($id);
        return response()->json($education);
    }

    // Show the form for editing the specified education
    public function edit($id)
    {
        $education = Education::findOrFail($id);
        return view('educations.edit', compact('education'));
    }

    // Update the specified education in storage
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'user_id' => 'required|integer',
        ]);

        $education = Education::findOrFail($id);
        $education->update($validated);
        return response()->json($education);
    }

    // Remove the specified education from storage
    public function destroy($id)
    {
        $education = Education::findOrFail($id);
        $education->delete();
        return response()->json(null, 204);
    }
}
