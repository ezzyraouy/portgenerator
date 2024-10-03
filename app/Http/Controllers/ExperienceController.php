<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    // Display a listing of the experiences
    public function index()
    {
        $experiences = Experience::all();
        return response()->json($experiences);
    }

    // Show the form for creating a new experience
    public function create()
    {
        return view('experiences.create');
    }

    // Store a newly created experience in storage
    public function store(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'user_id' => 'required|integer',
        ]);

        $experience = Experience::create($request->all());
        return response()->json($experience, 201);
    }

    // Display the specified experience
    public function show($id)
    {
        $experience = Experience::findOrFail($id);
        return response()->json($experience);
    }

    // Show the form for editing the specified experience
    public function edit($id)
    {
        $experience = Experience::findOrFail($id);
        return view('experiences.edit', compact('experience'));
    }

    // Update the specified experience in storage
    public function update(Request $request, $id)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'user_id' => 'required|integer',
        ]);

        $experience = Experience::findOrFail($id);
        $experience->update($request->all());
        return response()->json($experience);
    }

    // Remove the specified experience from storage
    public function destroy($id)
    {
        $experience = Experience::findOrFail($id);
        $experience->delete();
        return response()->json(null, 204);
    }
}

