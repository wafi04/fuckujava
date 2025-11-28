import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Ambil query parameters dari URL
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        const game = searchParams.get('game');
        const zone = searchParams.get('zone');


        // Validasi required params
        if (!id || !game) {
            console.log('❌ Validation failed: Missing required parameters');
            return NextResponse.json(
                { error: 'Missing required parameters: id, game' },
                { status: 400 }
            );
        }

        // Panggil API eksternal
        let apiUrl: string;
        if (zone) {
            apiUrl = `http://103.196.152.149:2222/otomax?api_key=VP3oNDHnXUv0TeP5HNVS&id=${id}&zoneid=${zone}&game=${game}&trxid=829829`;
        } else {
            apiUrl = `http://103.196.152.149:2222/otomax?api_key=VP3oNDHnXUv0TeP5HNVS&id=${id}&game=${game}&trxid=829829`;
        }

        const req = await fetch(apiUrl);
        const res = await req.text();

        // Parse response
        if (res.includes("ID Game Sukses")) {
            
            const userIdMatch = res.match(/UserID\s*:\s*(\d+)/);
            const zoneIdMatch = res.match(/ZoneID:\s*([^\/]+)/);
            const usernameMatch = res.match(/Username\s*:\s*([^\/\.\s]+)/);
            const regionMatch = res.match(/Region\s*:\s*([^$]+)/);

            // Helper function untuk clean value
            const cleanValue = (value: string | null | undefined): string | null => {
                if (!value) return null;
                const trimmed = value.trim();
                // Jika value adalah "-" atau kosong, return null
                if (trimmed === '-' || trimmed === '') return null;
                return trimmed;
            };

            const data: any = {
                success: true,
                userId: cleanValue(userIdMatch?.[1]),
                username: cleanValue(usernameMatch?.[1]),
            };

            // Conditional: tambahkan zone jika diminta
            if (zone) {
                const zoneValue = cleanValue(zoneIdMatch?.[1]);
                if (zoneValue) {
                    data.zoneId = zoneValue;
                }
            }

            // Selalu tambahkan region jika ada dan bukan "-"
            const regionValue = cleanValue(regionMatch?.[1]);
            if (regionValue) {
                data.region = regionValue;
            }

            return NextResponse.json(data);

        } else if (res.includes("Cek ID Gagal")) {
            
            return NextResponse.json(
                {
                    success: false,
                    message: 'ID tidak valid'
                },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: false, message: 'Unknown response format' },
            { status: 500 }
        );
    } catch (error) {
        return NextResponse.json(
            { 
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}