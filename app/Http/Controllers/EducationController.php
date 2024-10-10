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
        $request->validate([
            '*.institution_name' => 'required|string|max:255',
            '*.user_id' => 'required|integer',
            // Add additional validation rules as needed
        ]);
    
        // Initialize an array to hold created education entries
        $createdEducations = [];
    
        // Loop through each education entry
        foreach ($request->all() as $input) {
            $education = Education::create($input);
            $createdEducations[] = $education; 
        }
    
        return response()->json($createdEducations, 201);
    }

    // Display the specified education
    public function show($id)
    {
        $education = Education::where('user_id',$id)->get();
        return response()->json($education);
    }

    // Show the form for editing the specified education
    public function edit($id)
    {
        $education = Education::where('user_id',$id)->get();
        return response()->json($education);
    }

    // Update the specified education in storage
    public function update(Request $request, $id)
    {
         $request->validate([
            'institution_name' => 'required|string|max:255',
            'user_id' => 'required|integer',
        ]);

        $education = Education::findOrFail($id);
        $education->update($request->all());
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
