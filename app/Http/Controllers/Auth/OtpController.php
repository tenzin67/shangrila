<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class OtpController extends Controller
{
    public function sendOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
        ]);

        $otp = rand(100000, 999999);
        $phone = $request->phone;

        // Store OTP in cache for 10 minutes
        Cache::put('otp_' . $phone, $otp, 600);

        // Mock SMS - Log to file
        Log::info("FAKE SMS: Your OTP for {$phone} is {$otp}");

        return response()->json(['message' => 'OTP sent successfully. Check system logs.']);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required',
            'otp' => 'required|numeric',
        ]);

        $cachedOtp = Cache::get('otp_' . $request->phone);

        if (!$cachedOtp || $cachedOtp != $request->otp) {
            return back()->withErrors(['otp' => 'Invalid or expired OTP.']);
        }

        // OTP Valid - Find or Create User
        $user = User::firstOrCreate(
            ['phone' => $request->phone],
            [
                'name' => 'User ' . substr($request->phone, -4),
                'email' => $request->phone . '@placeholder.com', // Placeholder email
                'password' => bcrypt('password'),
            ]
        );

        Auth::login($user);
        Cache::forget('otp_' . $request->phone);

        return redirect('/');
    }
}
