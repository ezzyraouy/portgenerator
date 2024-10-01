<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\{Hotel,Riad,MaisonHotes,Restaurant,Activite,GuidesTouristique,Partage,Evenement,Lieux,Actualite,Gastronomie};
//use App\Models\Riad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;


use App\Mail\VerifiedAccountMail;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{

    public function index()
    {
    }

    // public function verifier(Request $request)
    // {

    //     $user = User::where('email', '=', $request['email'])->first();

    //     if ($user !== null) {
    //         if($user->is_verifier == true){
    //              return response('Votre compte a été déjà vérifier', 201);
    //         }
    //         elseif($user->code_verification === $request['codeVerification']){
    //             $user->is_verifier = true;
    //             $user->email_verified_at = new \DateTime();
    //             $user->update();
    //                return response('Votre compte a été bien vérifier', 200);
    //           }else{
    //                return response('Code vérification n\'est pas valider', 202);
    //           }
    //     }else{
    //                return response('Adresse email n\'est pas existe', 203);
    //     }

    // }

    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
        ]);


        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($request['password']),
            'is_verifier' =>1,
        ]);


        $token = $user->createToken('myapptoken')->plainTextToken;
        $respone = [
            'user' => $user,
            'token' => $token
        ];
        return response($respone, 201);
    }
    

    //  public function registerForAdmin(Request $request)
    // {

    //     $user = User::create([
    //         'role_id' => $request['role_id'],
    //         'nom' => $request['nom'],
    //         'prenom' => $request['prenom'],
    //         'email' => $request['email'],
    //         'type_service' => $request['type_service'],
    //         'password' => Hash::make($request['password'])
    //     ]);
    //     //$token = $user->createToken('myapptoken')->plainTextToken;
    //     $respone = [
    //         'user' => $user,
    //        // 'token' => $token
    //     ];
    //     return response($respone, 201);
    // }

    public function login(Request $request)
    {

        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Ces identifiants ne correspondent pas à nos enregistrements'
            ], 401);
        }

        //  if ($user->is_verifier == false) {
        //     return response([
        //         'message' => 'Votre compte n\'est pas encore vérifier'
        //     ], 401);
        // }


        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    // public function login_admin(Request $request)
    // {

    //     $fields = $request->validate([
    //         'email' => 'required|string',
    //         'password' => 'required|string'
    //     ]);
    //     $user = User::where('email', $fields['email'])->first();

    //     // Check password
    //     if (!$user || !Hash::check($fields['password'], $user->password)) {
    //         return response([
    //             'message' => 'Ces identifiants ne correspondent pas à nos enregistrements'
    //         ], 401);
    //     }else if($user->role_id != 3){
    //          return response([
    //             'message' => 'Vous n\'êtes pas autorisé à accéder à cette page'
    //         ], 401);
    //     }

    //     $token = $user->createToken('myapptoken')->plainTextToken;

    //     $response = [
    //         'user' => $user,
    //         'token' => $token
    //     ];

    //     return response($response, 201);
    // }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }

    
}
