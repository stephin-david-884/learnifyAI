import React, { useState } from "react";

import { Mic, CheckCircle2, AlertTriangle, Loader2, } from "lucide-react";

type Props = {

    onPermissionChange: (
        granted: boolean
    ) => void;

};

const MicrophonePermissionCard: React.FC<Props> = ({
    onPermissionChange,
}) => {

    const [loading, setLoading,] = useState(false);

    const [granted, setGranted,] = useState(false);

    const [denied, setDenied,] = useState(false);

    const [noDevice, setNoDevice,] = useState(false);

    const [deviceName, setDeviceName,] = useState("");

    const handlePermission =
        async () => {

            setLoading(true);

            setDenied(false);

            setNoDevice(false);

            let stream: MediaStream | null = null;

            try {

                stream = await navigator.mediaDevices.getUserMedia({ audio: true, });

                const devices = await navigator.mediaDevices.enumerateDevices();

                const microphone = devices.find((device) => device.kind === "audioinput");

                if (!microphone) {
                    setNoDevice(true);
                    setGranted(false);
                    onPermissionChange(false);
                    return;
                }

                setGranted(true);
                setDeviceName(microphone.label || "Microphone");
                onPermissionChange(true);

            } catch {

                setDenied(true);
                setGranted(false);
                onPermissionChange(false);

            } finally {

                stream?.getTracks().forEach((track) => track.stop());
                setLoading(false);

            }

        };

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6">

            <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">

                    <Mic className="text-red-600" />

                </div>

                <div>

                    <h2 className="text-xl font-bold text-slate-900">

                        Microphone Check

                    </h2>

                    <p className="text-sm text-slate-500">

                        Your microphone is required for the interview.

                    </p>

                </div>

            </div>

            {!granted && (

                <button
                    onClick={handlePermission}
                    disabled={loading}
                    className="mt-6 w-full rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >

                    {loading ? (

                        <span className="flex items-center justify-center gap-2">

                            <Loader2
                                className="animate-spin"
                                size={18}
                            />

                            Checking...

                        </span>

                    ) : (

                        "Enable Microphone"

                    )}

                </button>

            )}

            {granted && (

                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

                    <div className="flex items-center gap-2 font-semibold text-emerald-700">

                        <CheckCircle2 size={18} />

                        Microphone Ready

                    </div>

                    <p className="mt-2 text-sm text-emerald-700">

                        Detected Device

                    </p>

                    <p className="font-medium text-emerald-900">

                        {deviceName}

                    </p>

                </div>

            )}

            {denied && (

                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">

                    <div className="flex items-center gap-2 font-semibold text-red-700">

                        <AlertTriangle size={18} />

                        Permission Denied

                    </div>

                    <p className="mt-2 text-sm text-red-700">

                        Please allow microphone access in your browser settings.

                    </p>

                </div>

            )}

            {noDevice && (

                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">

                    <div className="flex items-center gap-2 font-semibold text-amber-700">

                        <AlertTriangle size={18} />

                        No Microphone Detected

                    </div>

                    <p className="mt-2 text-sm text-amber-700">

                        Connect a microphone and try again.

                    </p>

                </div>

            )}

        </div>

    );

};

export default MicrophonePermissionCard;