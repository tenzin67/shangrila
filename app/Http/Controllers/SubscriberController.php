<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Subscriber;
use App\Mail\WelcomeEmail;

class SubscriberController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:subscribers,email',
        ]);

        $subscriber = Subscriber::create([
            'email' => $validated['email'],
            'source' => 'footer',
        ]);

        if (app()->environment('production')) {
            Mail::to($subscriber->email)->send(new WelcomeEmail());
        }

        return back()->with('success', 'Thanks for subscribing! You’ll receive grocery deals & café updates.');
    }
}
